Rails.application.routes.draw do
  root to: "static_pages#root"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :songs, only: [:create, :update, :index, :show] do
      resources :annotations, only: [:create]
    end
    resources :annotations, only: [:update, :destroy]
    resources :artists, only: [:create, :show, :index]
  end
end
