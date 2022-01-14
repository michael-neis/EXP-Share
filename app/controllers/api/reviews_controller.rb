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
            new_review = Review.create!(review_params)
            render json: new_review, status: :created
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
        params.permit(:rating, :comment, :game_id, :user_id)
    end

    def is_authorized
        permitted = @review.user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end

end
