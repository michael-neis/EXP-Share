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
            new_wishlist = Wishlist.create!(wishlist_params)
            render json: new_wishlist, status: :created
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

    def destroy
        @wishlist.destroy
        head :no_content
    end


    private

    def find_wishlist
        @wishlist = Wishlist.find(params[:id])
    end

    def wishlist_params
        params.permit(:rating, :comment, :game_id, :user_id)
    end

    def is_authorized
        permitted = @wishlist.user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end

end
