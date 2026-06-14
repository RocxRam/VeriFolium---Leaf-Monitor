class ProfilesController < InertiaController
  def edit
    render inertia: "Profiles/Edit", props: {
      profile: Current.user.profile || Current.user.build_profile
    }
  end

  def update
    @profile = Current.user.profile || Current.user.build_profile
    if @profile.update(profile_params)
      redirect_to dashboard_path, notice: "Profile updated successfully."
    else
      render inertia: "Profiles/Edit", props: {
        profile: @profile,
        errors: @profile.errors
      }
    end
  end

  private

  def profile_params
    params.expect(profile: [ :land_size, :crops, :soil_type, :location ])
  end
end
