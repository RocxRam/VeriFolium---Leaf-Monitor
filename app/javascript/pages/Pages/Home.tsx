import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'
import { Link } from '@inertiajs/react'
import { signup_path, login_path } from '@/routes'
import { Hero } from '../../components/Utils'

function Home() {
  return (
    <>
      <section className="section">
        <Hero
          title="From Field Images to Confident Decisions"
          subtitle="About VeriFolium"
          description="We empower farmers with AI-driven crop disease detection, clear treatment guidance, and a smooth path to healthier harvests."
          primaryAction={{ text: 'Create Account', href: signup_path() }}
          secondaryAction={{ text: 'Login', href: login_path() }}
        />
      </section>

      <section className="section-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-100/90 px-4 py-2 text-sm font-semibold text-primary-700 mb-6">
              <span>Trusted by growers</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">AI for healthier crops, simpler decisions</h2>
            <p className="text-neutral-600 mb-6">
              VeriFolium combines high-accuracy plant disease detection with practical recommendations so farmers can react quickly, reduce loss, and grow more sustainably.
            </p>
            <ul className="space-y-4 text-neutral-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✓</span>
                <span>Instant crop health analysis from images collected in the field.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✓</span>
                <span>Clear treatment steps built around sustainable farming practices.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-2xl">✓</span>
                <span>Reports and tracking designed for real-world farm workflows.</span>
              </li>
            </ul>
          </div>
          <div className="section-accent animate-fade-in">
            <div className="grid grid-cols-2 gap-5">
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <span className="text-4xl">🌾</span>
                <h3 className="mt-4 font-bold text-lg">Field-ready insights</h3>
                <p className="mt-2 text-neutral-600 text-sm">Fast, practical recommendations to keep crops healthy and productive.</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <span className="text-4xl">🔬</span>
                <h3 className="mt-4 font-bold text-lg">Advanced AI</h3>
                <p className="mt-2 text-neutral-600 text-sm">Models trained on hundreds of thousands of disease images from diverse crops.</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <span className="text-4xl">📊</span>
                <h3 className="mt-4 font-bold text-lg">Performance metrics</h3>
                <p className="mt-2 text-neutral-600 text-sm">Track outcomes, accuracy, and decision history with clear reporting.</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-lg">
                <span className="text-4xl">🌍</span>
                <h3 className="mt-4 font-bold text-lg">Global support</h3>
                <p className="mt-2 text-neutral-600 text-sm">Designed for farmers worldwide with cross-region and multi-crop awareness.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our values</h2>
          <p className="text-lg text-neutral-600">Built around accuracy, accessibility, sustainability, and innovation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="card-animated">
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Accuracy</h3>
              <p className="text-sm text-neutral-600">Precise disease detection to make confident treatment choices.</p>
            </CardBody>
          </Card>

          <Card className="card-animated">
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Accessibility</h3>
              <p className="text-sm text-neutral-600">A simple interface that works for every farmer, everywhere.</p>
            </CardBody>
          </Card>

          <Card className="card-animated">
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">♻️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Sustainability</h3>
              <p className="text-sm text-neutral-600">Recommendations that protect crops and natural resources.</p>
            </CardBody>
          </Card>

          <Card className="card-animated">
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Innovation</h3>
              <p className="text-sm text-neutral-600">Continuously improving our AI and farmer workflows.</p>
            </CardBody>
          </Card>
        </div>
      </section>

      <section className="section">
        <div className="card-elevated card-base text-center">
          <h2 className="text-3xl font-bold mb-4">Join the VeriFolium community</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">Start using VeriFolium today and protect your crops with AI-powered insights.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={signup_path()} className="btn btn-primary btn-lg no-underline">Sign Up</Link>
            <Link href={login_path()} className="btn btn-outline btn-lg no-underline">Login</Link>
          </div>
        </div>
      </section>
    </>
  )
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>

export default Home
