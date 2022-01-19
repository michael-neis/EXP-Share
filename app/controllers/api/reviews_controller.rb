class Api::ReviewsController < ApplicationController

    skip_before_action :authenticate_user, only: [:index, :show]
    before_action :find_review, only: [:show, :update, :destroy]
    before_action :is_authorized, only: [:destroy, :update]

    def index
        render json: Review.all, status: :ok
    end

    def show
        render json: @review, status: :ok
    end

    def create
        if params[:user_id] == current_user.id

        game = Game.find_by(api_id: params[:api_id])

            if game
                new_review = Review.create!(user_id: current_user.id, game_id: game.id, rating: params[:rating], comment: params[:comment])
                render json: new_review, status: :created
            else
                new_game = Game.create!(api_id: params[:api_id], title: params[:title], image_id: params[:image_id], total_rating: params[:total_rating])
                new_game_review = Review.create!(user_id: current_user.id, game_id: new_game.id, rating: params[:rating], comment: params[:comment])
                render json: new_game_review, status: :created
            end

        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

    def update
        @review.update!(review_params)
        render json: @review, status: :accepted
    end

    def destroy
        @review.destroy
        head :no_content
    end


    private

    def find_review
        @review = Review.find(params[:id])
    end

    def review_params
        params.permit(:rating, :comment, :api_id, :user_id)
    end

    def is_authorized
        permitted = @review.user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end

end
