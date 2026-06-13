class RegistrationController < InertiaController
  allow_unauthenticated_access

  def new
    render inertia: "Registrations/New"
  end

  def create
    user = User.new(params.permit(:email_address, :password, :password_confirmation))
    if user.save
      start_new_session_for user
      redirect_to root_path, notice: "Welcome!"
    else
      redirect_to signup_path, alert: "Sign up failed: #{user.errors.full_messages.join(', ')}"
    end
  end
end
