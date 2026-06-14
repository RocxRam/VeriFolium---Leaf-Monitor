require "test_helper"

class ProfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should redirect to login if not authenticated" do
    get edit_profile_path
    assert_redirected_to login_path
  end

  test "should get edit if authenticated" do
    sign_in_as(@user)
    get edit_profile_path
    assert_response :success
  end

  test "should update profile" do
    sign_in_as(@user)
    patch profile_path, params: { profile: { land_size: 15.5, crops: "Wheat", soil_type: "Loamy", location: "North" } }
    assert_redirected_to dashboard_path
    
    @user.reload
    assert_equal 15.5, @user.profile.land_size
    assert_equal "Wheat", @user.profile.crops
  end
end
