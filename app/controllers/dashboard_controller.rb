class DashboardController < InertiaController
  def index
    render inertia: "Dashboard/Index", props: {
      profile: Current.user.profile,
      scans: Current.user.scans.order(created_at: :desc).limit(5)
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

    # 1. Fetch Current Weather
    current_url = URI("https://api.openweathermap.org/data/2.5/weather")
    current_url.query = URI.encode_www_form(lat: lat, lon: lon, units: "metric", appid: api_key.strip)

    # 2. Fetch 5-Day Forecast
    forecast_url = URI("https://api.openweathermap.org/data/2.5/forecast")
    forecast_url.query = URI.encode_www_form(lat: lat, lon: lon, units: "metric", appid: api_key.strip)

    def fetch_api(uri)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      http.verify_mode = OpenSSL::SSL::VERIFY_NONE
      http.request(Net::HTTP::Get.new(uri))
    end
    curr_res = fetch_api(current_url)
    fore_res = fetch_api(forecast_url)

    if curr_res.is_a?(Net::HTTPSuccess) && fore_res.is_a?(Net::HTTPSuccess)
      curr_data = JSON.parse(curr_res.body)
      fore_data = JSON.parse(fore_res.body)

      # Forecast returns 3-hour intervals, taking the first item of next day (~24h ahead)
      # Safely access the list to avoid 502 if forecast is unavailable
      tomorrow_data = fore_data.dig("list", 8) || {}

      render json: {
        today: {
          temp: curr_data.dig("main", "temp"),
          feels_like: curr_data.dig("main", "feels_like"),
          description: curr_data.dig("weather", 0, "description"),
          icon: curr_data.dig("weather", 0, "icon"),
          humidity: curr_data.dig("main", "humidity"),
          wind_speed: curr_data.dig("wind", "speed")
        },
        tomorrow: {
          min: tomorrow_data.dig("main", "temp_min"),
          max: tomorrow_data.dig("main", "temp_max"),
          description: tomorrow_data.dig("weather", 0, "description"),
          icon: tomorrow_data.dig("weather", 0, "icon"),
          humidity: tomorrow_data.dig("main", "humidity"),
          wind_speed: tomorrow_data.dig("wind", "speed")
        }
      }
    else
      Rails.logger.error "Weather API Error: Curr: #{curr_res.code}, Fore: #{fore_res.code}"
      render json: { error: "Unable to fetch weather data" }, status: :bad_gateway
    end
  end
end
