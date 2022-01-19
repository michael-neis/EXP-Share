class Api::ListItemsController < ApplicationController

    skip_before_action :authenticate_user, only: [:index, :show]
    before_action :find_item, only: [:show, :destroy]
    before_action :find_list, only: [:create]

    def index
        render json: ListItem.all, status: :ok
    end

    def show
        render json: @item, status: :ok
    end

    def create
        if @list.user_id == current_user.id
            new_item = ListItem.create!(item_params)
            render json: new_item, status: :created
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

    def destroy
        if @item.list.user_id == current_user.id
            @item.destroy
            head :no_content
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
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
end
