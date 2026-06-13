import Layout from '../../components/Layout'
import { Hero } from '../../components/Utils'
import Card, { CardBody } from '../../components/Card'
import { about_path, login_path, signup_path } from '@/routes'
import { Link } from '@inertiajs/react'

function Index() {
  return (
    <>
      {/* Hero Section */}
      <section className="section">
        <Hero
          title="Protect Your Crops with AI"
          subtitle="Smart Disease Detection"
          description="Upload images of your affected crops and get instant AI-powered disease predictions with actionable recommendations to save your harvest."
          primaryAction={{
            text: 'Get Started',
            href: login_path(),
          }}
          secondaryAction={{
            text: 'Learn More',
            href: about_path(),
          }}
        />
      </section>

      {/* Features Section */}
      <section className="section-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose VeriFolium?</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Advanced AI technology meets sustainable farming practices
          </p>
        </div>

        <div className="grid-auto">
          {/* Feature 1 */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg gradient-primary center-flex">
                  <span className="text-2xl">🔬</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Accurate Detection</h3>
              <p className="text-neutral-600">
                Our AI model has been trained on thousands of crop images to identify diseases with 98% accuracy.
              </p>
            </CardBody>
          </Card>

          {/* Feature 2 */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg gradient-secondary center-flex">
                  <span className="text-2xl">💡</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
              <p className="text-neutral-600">
                Get personalized treatment recommendations based on your crop type and disease diagnosis.
              </p>
            </CardBody>
          </Card>

          {/* Feature 3 */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg gradient-accent center-flex">
                  <span className="text-2xl">🌍</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Global Support</h3>
              <p className="text-neutral-600">
                Available in multiple languages and supports crops from around the world.
              </p>
            </CardBody>
          </Card>

          {/* Feature 4 */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg gradient-primary center-flex">
                  <span className="text-2xl">📱</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Mobile Ready</h3>
              <p className="text-neutral-600">
                Use your smartphone to take photos directly in the field and get instant insights.
              </p>
            </CardBody>
          </Card>

          {/* Feature 5 */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg gradient-secondary center-flex">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Track Progress</h3>
              <p className="text-neutral-600">
                Keep detailed records of all your diagnoses and treatment outcomes over time.
              </p>
            </CardBody>
          </Card>

          {/* Feature 6 */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <div className="w-12 h-12 rounded-lg gradient-accent center-flex">
                  <span className="text-2xl">🔒</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
              <p className="text-neutral-600">
                Your data is encrypted and never shared with third parties.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-sm bg-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-neutral-600">Three simple steps to diagnose your crops</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full gradient-primary center-flex mb-4 text-white font-bold text-2xl">
                1
              </div>
              <h3 className="font-bold text-lg mb-2">Upload Image</h3>
              <p className="text-center text-neutral-600">
                Take a clear photo of your affected crop and upload it to our platform.
              </p>
            </div>
            {/* Connector line (hidden on mobile) */}
            <div className="hidden md:block absolute top-8 left-[62%] w-[calc(100%-3rem)] h-1 gradient-primary opacity-30" />
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full gradient-secondary center-flex mb-4 text-white font-bold text-2xl">
                2
              </div>
              <h3 className="font-bold text-lg mb-2">AI Analysis</h3>
              <p className="text-center text-neutral-600">
                Our advanced AI analyzes the image and identifies the disease.
              </p>
            </div>
            <div className="hidden md:block absolute top-8 left-[62%] w-[calc(100%-3rem)] h-1 gradient-secondary opacity-30" />
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full gradient-accent center-flex mb-4 text-white font-bold text-2xl">
                3
              </div>
              <h3 className="font-bold text-lg mb-2">Get Recommendations</h3>
              <p className="text-center text-neutral-600">
                Receive personalized treatment recommendations and best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card-elevated card-base text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Protecting Your Crops?</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers using VeriFolium to improve crop health and increase yields.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href={signup_path()} className="btn btn-primary btn-lg no-underline">
              Sign in
            </Link>
            <Link href={about_path()} className="btn btn-outline btn-lg no-underline">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

Index.layout = (page) => <Layout>{page}</Layout>

export default Index
