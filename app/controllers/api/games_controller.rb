require 'httparty'

class Api::GamesController < ApplicationController

    skip_before_action :authenticate_user, only: [:show, :game_test]

    def show
        game = Game.find(params[:id])
        render json: game, status: :ok
    end

    def create
        game = Game.create!(game_params)
        render json: game, status: :created
    end

    def game_test

        game_id = params[:game_id]

        response = HTTParty.post("https://api.igdb.com/v4/games",

            :headers => {
              "Content-Type" => "text/plain",
              "Client-ID" => "#{ENV['client_id_token']}",
              "Authorization" => "#{ENV['authorization_bearer_token']}"
            },
            :body => "fields *, collection.name, collection.games.name, cover.url, platforms.name, platforms.platform_logo.url;  where id = #{game_id};"
          )
          
          render json: response.body
    end


    private

    def game_params
        params.permit(:api_id, :title, :cover_image, :total_rating)
    end

end
