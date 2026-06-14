require "test_helper"

class DashboardControllerTest < ActionDispatch::IntegrationTest
  setup do
    @user = users(:one)
  end

  test "should redirect to login if not authenticated" do
    get dashboard_path
    assert_redirected_to login_path
  end

  test "should get index if authenticated" do
    sign_in_as(@user)
    get dashboard_path
    assert_response :success
  end
end
