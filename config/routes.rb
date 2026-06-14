Rails.application.routes.draw do
  root "pages#index"
  get "dashboard", to: "dashboard#index"
  resource :profile, only: [ :edit, :update ]
  resources :scans, only: [ :new, :create, :show ]

  get "about", to: "pages#about"
  get "about/team", to: "pages#team"
  get "about/technology", to: "pages#technology"

  get "login", to: "sessions#new"
  post "login", to: "sessions#create"

  get "signup", to: "registration#new"
  post "signup", to: "registration#create"

  delete "logout", to: "sessions#destroy"
  resources :passwords, param: :token

  # Redirect to localhost from 127.0.0.1 to use same IP address with Vite server
  constraints(host: "127.0.0.1") do
    get "(*path)", to: redirect { |params, req| "#{req.protocol}localhost:#{req.port}/#{params[:path]}" }
  end
end
