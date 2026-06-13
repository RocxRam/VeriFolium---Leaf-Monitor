require "test_helper"

class RegistrationControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get signup_path
    assert_response :success
  end

  test "should get create" do
    post signup_path, params: { email_address: "test@example.com", password: "password", password_confirmation: "password" }
    assert_redirected_to root_path
  end

  test "should redirect to root if already authenticated" do
    sign_in_as(User.take)
    get signup_path
    assert_redirected_to root_path
  end
end
