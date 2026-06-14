class PagesController < InertiaController
  allow_unauthenticated_access
  def index
    render inertia: "Pages/Index"
  end

  def about
    render inertia: "Pages/About"
  end

  def home
    render inertia: "Pages/Home"
  end

  def team
    render inertia: "Pages/Team"
  end

  def technology
    render inertia: "Pages/Technology"
  end
end
