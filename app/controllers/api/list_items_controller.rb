class Api::ListItemsController < ApplicationController

    skip_before_action :authenticate_user, only: [:index, :show]
    before_action :find_item, only: [:show, :destroy]
    before_action :find_list, only: [:create, :destroy]
    before_action :is_authorized, only: [:destroy, :create]

    def index
        render json: ListItem.all, status: :ok
    end

    def show
        render json: @item, status: :ok
    end

    def create
        new_item = ListItem.create!(item_params)
        render json: new_item, status: :created
    end

    def destroy
        @item.destroy
        head :no_content
    end


    private

    def find_item
        @item = ListItem.find(params[:id])
    end

    def find_list
        @list = List.find(params[:list_id])
    end

    def item_params
        params.permit(:list_id, :game_id)
    end

    def is_authorized
        permitted = @list.user_id == current_user.id
        render json: {errors: "Access denied"}, status: :forbidden unless permitted
    end
end
