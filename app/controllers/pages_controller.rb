class PagesController < InertiaController
  allow_unauthenticated_access
  def index
    render inertia: "Pages/Index"
  end

  def about
    render inertia: "Pages/About"
  end

<<<<<<< Updated upstream
  def team
    render inertia: "Pages/Team"
  end

  def technology
    render inertia: "Pages/Technology"
=======
  def inference
    render inertia: "Pages/Inference"
>>>>>>> Stashed changes
  end
end
