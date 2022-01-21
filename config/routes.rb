Rails.application.routes.draw do
  namespace :api do
    resources :games, only: [:show, :create]
    resources :lists
    resources :reviews
    resources :wishlists, only: [:index, :show, :create, :destroy]
    resources :users, only: [:show, :destroy, :update]
    resources :list_items, only: [:create, :index, :show, :destroy]
    resources :friendships, only: [:index, :create, :destroy]
    resources :friend_requests, only: [:show, :destroy, :create]

    get "/me", to: "users#me"
    post "/signup", to: "users#create"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
    post '/show_game', to: "games#show_game"
    post '/search_games', to: "games#search_games"
    get '/user_lists/:id', to: "lists#user_lists"
    get '/user_reviews/:id', to: "reviews#user_reviews"
    get '/user_wishlists/:id', to: "wishlists#user_wishlists"
    post '/search_users', to: "users#search_users"
    get '/show_user/:id', to: "users#show_user"
   


    get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
    
  end
end
