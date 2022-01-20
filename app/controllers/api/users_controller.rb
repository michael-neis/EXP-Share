class Api::UsersController < ApplicationController

    skip_before_action :authenticate_user, only: [:create, :me]
    before_action :find_user, only: [:update, :destroy]
    before_action :is_authorized, only: [:update, :destroy]

    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: :created
    end

    def show
        user = User.find(params[:id])
        render json: user, status: :ok
    end

    def update
        @user.update!(user_params)
        render json: @user, status: :accepted
    end

    def destroy
        @user.destroy
        head :no_content
    end

    def me
        if current_user
            render json: current_user, status: :ok
        else
            render json: {error: "Not logged in"}, status: :unauthorized
        end
    end

    def search_users
        if current_user.username == params[:username]
            render json: {error: "that is you!"}, status: :unauthorized
        else
            user = User.find_by!(username: params[:username])
            render json: user, status: :ok
        end
    end

    private

    def user_params
        params.permit(:username, :profile_pic, :bio, :password)
    end

    def find_user
        @user = User.find(params[:id])
    end

    def is_authorized
        permitted = @user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end

end
