import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'

function Technology() {
  return (
    <>
      <section className="section">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-primary-600 mb-4">Technology</p>
          <h1 className="text-5xl font-bold mb-4">AI built for smarter farming</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            VeriFolium combines modern machine learning, cloud-scale analysis, and practical recommendations to help crops thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="card-animated">
            <CardBody>
              <div className="mb-4 text-4xl">🤖</div>
              <h3 className="font-bold text-xl mb-3">Deep learning diagnosis</h3>
              <p className="text-neutral-600">Our models identify disease symptoms across leaf color, texture, and pattern with industry-leading accuracy.</p>
            </CardBody>
          </Card>

          <Card className="card-animated">
            <CardBody>
              <div className="mb-4 text-4xl">☁️</div>
              <h3 className="font-bold text-xl mb-3">Scalable analysis</h3>
              <p className="text-neutral-600">Fast cloud inference means field images are processed quickly, even across large farms and busy seasons.</p>
            </CardBody>
          </Card>

          <Card className="card-animated">
            <CardBody>
              <div className="mb-4 text-4xl">📱</div>
              <h3 className="font-bold text-xl mb-3">Mobile-enabled workflow</h3>
              <p className="text-neutral-600">Farmers can capture and submit images directly from their phones, no desktop required.</p>
            </CardBody>
          </Card>
        </div>

        <section className="section-sm section-highlight mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Built on reliable data</h2>
              <p className="text-neutral-600 mb-6">
                VeriFolium’s engine is trained on diverse crop and disease samples to deliver consistent results under real-world conditions.
              </p>
              <ul className="space-y-4 text-neutral-600">
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-2xl">✅</span>
                  <span>Extensive training data for multiple crop varieties and disease stages.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-2xl">✅</span>
                  <span>Continuous model updates driven by new field imagery and feedback.</span>
                </li>
                <li className="flex gap-3 items-start">
                  <span className="mt-1 text-2xl">✅</span>
                  <span>Secure processing and performance monitoring for every diagnosis.</span>
                </li>
              </ul>
            </div>
            <div className="rounded-[2rem] overflow-hidden bg-white shadow-xl">
              <div className="bg-primary-600 text-white p-8">
                <p className="text-sm uppercase tracking-[0.2em] font-semibold">Performance metrics</p>
                <h3 className="text-3xl font-bold mt-4">98% detection quality</h3>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <p className="text-sm text-neutral-500">Average analysis time</p>
                  <p className="text-2xl font-bold"><span className="text-primary-600"><span className="text-white">~3</span></span> seconds</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Coverage</p>
                  <p className="text-2xl font-bold">100+ crop conditions</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500">Recommendations provided</p>
                  <p className="text-2xl font-bold">Field-tested & region-aware</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}

Technology.layout = (page: React.ReactNode) => <Layout>{page}</Layout>

export default Technology
