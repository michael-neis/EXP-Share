class Api::ListsController < ApplicationController

    skip_before_action :authenticate_user, only: [:index, :show]
    before_action :find_list, only: [:show, :update, :destroy]
    before_action :is_authorized, only: [:destroy, :update]

    def index
        render json: List.all, status: :ok
    end

    def show
        render json: @list, status: :ok
    end

    def create
        if params[:user_id] == current_user.id
            new_list = List.create!(list_params)
            render json: new_list, status: :created
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

    def update
        @list.update!(list_params)
        render json: @list, status: :accepted
    end

    def destroy
        @list.destroy
        head :no_content
    end

    def user_lists
        user = User.find(params[:id])
        lists = user.lists
        render :json => lists, status: :ok
    end


    private

    def find_list
        @list = List.find(params[:id])
    end

    def list_params
        params.permit(:list_name, :public, :user_id)
    end

    def is_authorized
        permitted = @list.user == current_user
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end
end
