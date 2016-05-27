Rails.application.routes.draw do
  root to: "static_pages#root"
  get '/.well-known/acme-challenge/:id' => "static_pages#letsencrypt"
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  namespace :api, defaults: {format: :json} do
    resources :songs, only: [:create, :update, :index, :show] do
      resources :annotations, only: [:create]
      resources :comments, only: [:create]
    end
    resources :annotations, only: [:update, :destroy]
    resources :artists, only: [:create, :show, :index, :update] do
      resources :comments, only: [:create]
    end
    resources :users, only: [:show, :update]
    resources :comments, only: [:destroy]
  end
end
