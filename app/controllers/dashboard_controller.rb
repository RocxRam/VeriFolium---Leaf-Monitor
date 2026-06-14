class DashboardController < InertiaController
  def index
    render inertia: "Dashboard/Index", props: {
      profile: Current.user.profile,
      scans: Current.user.scans.order(created_at: :desc).limit(5)
      # Weather API info, use Rails.application.credentials.dig(:openweather_api_key)
    }
  end
end
