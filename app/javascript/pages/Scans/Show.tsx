import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { Link } from '@inertiajs/react'
import ReactMarkdown from 'react-markdown'

interface Scan {
  disease_name: string
  remedies: string
  confidence_score: number
}

function Show({ scan }: { scan: Scan }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Diagnosis Result</h1>
      <Card className="card-elevated">
        <CardBody className="p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-500">Disease Detected</h2>
            <p className="text-2xl font-bold text-primary-600">{scan.disease_name}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-500">Confidence (local inference)</h2>
            <p className="text-lg font-semibold text-neutral-800">{(scan.confidence_score * 100).toFixed(2)}%</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-500">Possible Remedies</h2>
            <div className="prose prose-neutral max-w-none text-neutral-700">
              <ReactMarkdown>{scan.remedies}</ReactMarkdown>
            </div>
          </div>
          <Link href="/dashboard" className="btn btn-outline btn-full">
            Back to Dashboard
          </Link>
        </CardBody>
      </Card>
    </div>
  )
}

Show.layout = (page: any) => <Layout title="Diagnosis Result">{page}</Layout>

export default Show
