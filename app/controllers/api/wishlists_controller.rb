class Api::WishlistsController < ApplicationController

    skip_before_action :authenticate_user, only: [:index, :show]
    before_action :find_wishlist, only: [:show, :destroy]
    before_action :is_authorized, only: [:destroy,]

    def index
        render json: Wishlist.all, status: :ok
    end

    def show
        render json: @wishlist, status: :ok
    end

    def create
        if params[:user_id] == current_user.id

            game = Game.find_by(api_id: params[:api_id])
    
                if game
                    new_wishlist = Wishlist.create!(user_id: current_user.id, game_id: game.id)
                    render json: new_wishlist, status: :created
                else
                    new_game = Game.create!(api_id: params[:api_id], title: params[:title], image_id: params[:image_id], total_rating: params[:total_rating])
                    new_game_wishlist = Wishlist.create!(user_id: current_user.id, game_id: new_game.id)
                    render json: new_game_wishlist, status: :created
                end
    
            else
                render json: {errors: "Access denied"}, status: :forbidden
            end
    end

    def destroy
        @wishlist.destroy
        head :no_content
    end

    def user_wishlists
        user = User.find(params[:id])
        games = user.wishlist_games
        render :json => games, status: :ok
    end

    private

    def find_wishlist
        @wishlist = Wishlist.find(params[:id])
    end

    def is_authorized
        permitted = @wishlist.user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end

end
