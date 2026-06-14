import Layout from '../../components/Layout'
import { Link } from '@inertiajs/react'

function About() {
  return (
    <>
      <section className="section">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold leading-tight">About Sections</h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">Choose a section to view more details.</p>

          <div className="flex gap-4 justify-center mt-6">
            <Link href="/about/home" className="btn btn-primary no-underline">Home</Link>
            <Link href="/about/technology" className="btn btn-outline no-underline">Technology</Link>
            <Link href="/about/team" className="btn btn-outline no-underline">Team</Link>
          </div>
        </div>
      </section>
    </>
  )
}

About.layout = (page: React.ReactNode) => <Layout>{page}</Layout>

export default About
