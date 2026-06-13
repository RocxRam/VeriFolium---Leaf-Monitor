# frozen_string_literal: true

class InertiaController < ApplicationController
  # Share data with all Inertia responses
  # see https://inertia-rails.dev/guide/shared-data
  inertia_share auth: -> {
    {
      user: Current.user ? {
        id: Current.user.id,
        email: Current.user.email_address,
        name: Current.user.email_address.split('@').first.capitalize
      } : nil
    }
  }
end
