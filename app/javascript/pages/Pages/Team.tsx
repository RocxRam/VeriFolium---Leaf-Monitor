import Layout from '../../components/Layout'

function Team() {
  return (
    <>
      <section className="section">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-primary-600 mb-4">Meet the team</p>
          <h1 className="text-5xl font-bold mb-4">Students building tomorrow’s agtech</h1>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            A focused group of aspiring AI engineers and software builders creating a premium crop health platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card card-animated p-8 text-center">
            <div className="w-24 h-24 rounded-full gradient-primary center-flex mx-auto mb-6 text-4xl shadow-xl">👨‍🌾</div>
            <h3 className="font-bold text-xl mb-1">Harish Kumar M</h3>
            <p className="text-sm text-primary-600 mb-4">Team Leader</p>
            <p className="text-neutral-600 text-sm">
              Experienced developer guiding product vision, architecture, and engineering quality.
            </p>
          </div>

          <div className="card card-animated p-8 text-center">
            <div className="w-24 h-24 rounded-full gradient-secondary center-flex mx-auto mb-6 text-4xl shadow-xl">👩‍💻</div>
            <h3 className="font-bold text-xl mb-1">Derek Jeremy Winkins</h3>
            <p className="text-sm text-primary-600 mb-4">AI Engineer</p>
            <p className="text-neutral-600 text-sm">
              Focused on model performance and a smooth experience for farmers using the system.
            </p>
          </div>

          <div className="card card-animated p-8 text-center">
            <div className="w-24 h-24 rounded-full gradient-accent center-flex mx-auto mb-6 text-4xl shadow-xl">👨‍🔧</div>
            <h3 className="font-bold text-xl mb-1">Subrahmanian Ramakrishnan</h3>
            <p className="text-sm text-primary-600 mb-4">Software Engineer</p>
            <p className="text-neutral-600 text-sm">
              Building polished interfaces and reliable workflows to make adoption simple.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

Team.layout = (page: React.ReactNode) => <Layout>{page}</Layout>

export default Team
