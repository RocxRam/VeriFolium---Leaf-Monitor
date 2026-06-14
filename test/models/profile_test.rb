require "test_helper"

class ProfileTest < ActiveSupport::TestCase
  test "should belong to user" do
    user = users(:one)
    profile = Profile.new(user: user, land_size: 10.5)
    assert profile.valid?
    assert_equal user, profile.user
  end

  test "should require user" do
    profile = Profile.new(land_size: 10.5)
    assert_not profile.valid?
  end
end
