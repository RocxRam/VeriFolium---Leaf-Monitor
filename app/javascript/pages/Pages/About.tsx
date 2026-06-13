import Layout from '../../components/Layout'
import Card, { CardBody } from '../../components/Card'

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section">
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold leading-tight">About VeriFolium</h1>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Empowering farmers worldwide with AI-powered crop disease detection and sustainable farming solutions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-neutral-600 mb-4">
              VeriFolium is dedicated to revolutionizing agricultural practices through cutting-edge AI technology. We believe that every farmer, regardless of their size or location, deserves access to advanced disease detection tools.
            </p>
            <p className="text-neutral-600 mb-4">
              Our mission is to reduce crop losses, increase yields, and promote sustainable farming practices by making intelligent disease detection accessible to all.
            </p>
            <p className="text-neutral-600">
              By combining machine learning with agricultural expertise, we're helping farmers protect their livelihoods and contribute to global food security.
            </p>
          </div>
          <div className="gradient-primary rounded-lg p-8 text-white">
            <div className="space-y-6 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <p className="text-lg opacity-90">Detection Accuracy</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <p className="text-lg opacity-90">Active Farmers</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">150+</div>
                <p className="text-lg opacity-90">Crop Varieties Supported</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12</div>
                <p className="text-lg opacity-90">Languages Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-lg text-neutral-600">Principles that guide everything we do</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Accuracy */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">🎯</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Accuracy</h3>
              <p className="text-sm text-neutral-600">
                We prioritize precise disease detection and reliable recommendations.
              </p>
            </CardBody>
          </Card>

          {/* Accessibility */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">🌍</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Accessibility</h3>
              <p className="text-sm text-neutral-600">
                Our tools are available to farmers everywhere, regardless of tech experience.
              </p>
            </CardBody>
          </Card>

          {/* Sustainability */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">♻️</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Sustainability</h3>
              <p className="text-sm text-neutral-600">
                We promote eco-friendly practices that protect both crops and the environment.
              </p>
            </CardBody>
          </Card>

          {/* Innovation */}
          <Card>
            <CardBody>
              <div className="mb-4">
                <span className="text-4xl">⚡</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Innovation</h3>
              <p className="text-sm text-neutral-600">
                Constantly improving our AI models and platform features.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-sm bg-white -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-lg text-neutral-600">Expert agriculturalists and AI engineers working together</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full gradient-primary center-flex mx-auto mb-4">
              <span className="text-4xl">👨‍🌾</span>
            </div>
            <h3 className="font-bold text-lg">Dr. Rajesh Kumar</h3>
            <p className="text-sm text-primary-600 mb-2">Founder & CEO</p>
            <p className="text-sm text-neutral-600">Agricultural scientist with 15+ years of experience</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full gradient-secondary center-flex mx-auto mb-4">
              <span className="text-4xl">👩‍💻</span>
            </div>
            <h3 className="font-bold text-lg">Priya Sharma</h3>
            <p className="text-sm text-primary-600 mb-2">AI Lead</p>
            <p className="text-sm text-neutral-600">Machine learning expert specializing in computer vision</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full gradient-accent center-flex mx-auto mb-4">
              <span className="text-4xl">👨‍🔧</span>
            </div>
            <h3 className="font-bold text-lg">Arjun Singh</h3>
            <p className="text-sm text-primary-600 mb-2">CTO</p>
            <p className="text-sm text-neutral-600">Full-stack engineer with passion for scalable systems</p>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full gradient-primary center-flex mx-auto mb-4">
              <span className="text-4xl">👩‍💼</span>
            </div>
            <h3 className="font-bold text-lg">Ananya Patel</h3>
            <p className="text-sm text-primary-600 mb-2">Community Manager</p>
            <p className="text-sm text-neutral-600">Dedicated to farmer support and global outreach</p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="section-sm">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technology Behind VeriFolium</h2>
          <p className="text-lg text-neutral-600">Built with the latest advances in AI and cloud computing</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardBody>
              <h3 className="font-bold text-lg mb-2">Deep Learning Models</h3>
              <p className="text-neutral-600">
                We use state-of-the-art convolutional neural networks trained on over 100,000 images to accurately identify crop diseases.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="font-bold text-lg mb-2">Cloud Infrastructure</h3>
              <p className="text-neutral-600">
                Scalable cloud-based architecture ensures reliable and fast performance for farmers worldwide.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <h3 className="font-bold text-lg mb-2">Real-time Processing</h3>
              <p className="text-neutral-600">
                Get instant results on your mobile device, even in areas with limited connectivity.
              </p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="card-elevated card-base text-center">
          <h2 className="text-3xl font-bold mb-4">Join the VeriFolium Community</h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Start using VeriFolium today and protect your crops with AI-powered insights.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/signup" className="btn btn-primary btn-lg no-underline">
              Get Started Free
            </a>
            <a href="/login" className="btn btn-outline btn-lg no-underline">
              Login to Account
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
