class PagesController < ApplicationController
  allow_unauthenticated_access
  def index
    render inertia: "Pages/Index"
  end

  def about
    render inertia: "Pages/About"
  end
end
