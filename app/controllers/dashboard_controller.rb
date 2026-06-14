class DashboardController < InertiaController
  def index
    render inertia: "Dashboard/Index", props: {
      profile: Current.user.profile,
      scans: Current.user.scans.order(created_at: :desc).limit(5)
      # Weather API info, use Rails.application.credentials.dig(:openweather_api_key)
    }
  end

  def weather
    api_key = Rails.application.credentials.dig(:openweather_api_key)
    unless api_key.present?
      render json: { error: "OpenWeather API key is not configured" }, status: :unprocessable_entity
      return
    end

    lat = params[:lat]
    lon = params[:lon]
    unless lat.present? && lon.present?
      render json: { error: "Latitude and longitude are required" }, status: :bad_request
      return
    end

    url = URI("https://api.openweathermap.org/data/2.5/onecall")
    url.query = URI.encode_www_form(
      lat: lat,
      lon: lon,
      exclude: "minutely,hourly,alerts",
      units: "metric",
      appid: api_key,
    )

    response = Net::HTTP.get_response(url)
    if response.is_a?(Net::HTTPSuccess)
      payload = JSON.parse(response.body)
      today = payload.dig("current")
      tomorrow = payload.dig("daily", 1)
      render json: {
        today: {
          temp: today["temp"],
          feels_like: today["feels_like"],
          description: today.dig("weather", 0, "description"),
          icon: today.dig("weather", 0, "icon"),
          humidity: today["humidity"],
          wind_speed: today["wind_speed"],
        },
        tomorrow: {
          min: tomorrow.dig("temp", "min"),
          max: tomorrow.dig("temp", "max"),
          description: tomorrow.dig("weather", 0, "description"),
          icon: tomorrow.dig("weather", 0, "icon"),
          humidity: tomorrow["humidity"],
          wind_speed: tomorrow["wind_speed"],
        },
      }
    else
      render json: { error: "Unable to fetch weather data" }, status: :bad_gateway
    end
  end
end
