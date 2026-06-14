class DashboardController < InertiaController
  def index
    render inertia: "Dashboard/Index", props: {
      profile: Current.user.profile
    }
  end
end
