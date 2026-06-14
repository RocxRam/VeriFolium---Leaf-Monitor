import { useEffect, useRef, useState } from 'react'

type TensorPayload = { data: number[] | Float32Array; shape: number[]; dtype?: 'float32' | 'int32' | string }

type WorkerResponse =
  | { type: 'inited' | 'warmed' | 'disposed'; id: number }
  | { type: 'result'; id: number; result: Array<{ data: number[]; shape: number[]; dtype: string }> }
  | { type: 'error'; id: number; error: string }

export default function useInferenceWorker(modelPath?: string) {
  const [ready, setReady] = useState(false)
  const workerRef = useRef<Worker | null>(null)
  const pending = useRef(new Map<number, { resolve: (v: any) => void; reject: (e: any) => void }>())
  const requestId = useRef(0)

  useEffect(() => {
    const w = new Worker('/inferenceWorker.js')
    workerRef.current = w

    w.onmessage = (e: MessageEvent<WorkerResponse>) => {
      const msg = e.data
      if (!msg) return

      if (msg.type === 'inited' || msg.type === 'warmed') {
        setReady(true)
        const cb = pending.current.get(msg.id)
        if (cb) {
          cb.resolve(true)
          pending.current.delete(msg.id)
        }
        return
      }

      if (msg.type === 'result') {
        const cb = pending.current.get(msg.id)
        if (cb) {
          cb.resolve(msg.result)
          pending.current.delete(msg.id)
        }
        return
      }

      if (msg.type === 'error') {
        const cb = pending.current.get(msg.id)
        if (cb) {
          cb.reject(new Error(msg.error))
          pending.current.delete(msg.id)
        }
        return
      }
    }

    // initialize worker with optional modelPath
    const initId = ++requestId.current
    const initP = new Promise<void>((resolve, reject) => {
      pending.current.set(initId, { resolve, reject })
    })
    w.postMessage({ type: 'init', id: initId, payload: { path: modelPath } })

    // cleanup
    return () => {
      w.terminate()
      workerRef.current = null
      pending.current.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function warmup(): Promise<void> {
    const id = ++requestId.current
    return new Promise((resolve, reject) => {
      pending.current.set(id, { resolve, reject })
      workerRef.current?.postMessage({ type: 'warmup', id, payload: { path: modelPath } })
    })
  }

  function predict(input: TensorPayload): Promise<Array<{ data: number[]; shape: number[]; dtype: string }>> {
    const id = ++requestId.current
    return new Promise((resolve, reject) => {
      pending.current.set(id, { resolve, reject })
      workerRef.current?.postMessage({ type: 'predict', id, payload: { path: modelPath, input } })
      // optional: simple timeout
      setTimeout(() => {
        if (pending.current.has(id)) {
          pending.current.get(id)!.reject(new Error('Inference timed out'))
          pending.current.delete(id)
        }
      }, 30000)
    })
  }

  async function predictImage(image: ImageBitmap, height = 224, width = 224): Promise<Array<{ data: number[]; shape: number[]; dtype: string }>> {
    const id = ++requestId.current
    return new Promise((resolve, reject) => {
      pending.current.set(id, { resolve, reject })
      workerRef.current?.postMessage(
        { type: 'predict_image', id, payload: { path: modelPath, image, height, width } },
        [image],
      )
      setTimeout(() => {
        if (pending.current.has(id)) {
          pending.current.get(id)!.reject(new Error('Image inference timed out'))
          pending.current.delete(id)
        }
      }, 30000)
    })
  }

  function dispose() {
    const id = ++requestId.current
    workerRef.current?.postMessage({ type: 'dispose', id })
  }

  return { ready, warmup, predict, predictImage, dispose }
}
