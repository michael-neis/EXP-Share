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
            if params[:game_id]
                new_item = ListItem.create!(item_params)
                puts 'it worked with established game'
                render json: new_item, status: :created
            else
                new_game = Game.create!(api_id: params[:api_id], title: params[:title], image_id: params[:image_id], total_rating: params[:total_rating])
                new_game_item = ListItem.create!(list_id: params[:list_id], game_id: new_game.id)
                puts 'it worked with non established game'
                render :json => new_game_item, status: :created
            end
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
