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

    def search_games

        game_title = params[:_json]

        response = HTTParty.post("https://api.igdb.com/v4/games",

            :headers => {
              "Content-Type" => "text/plain",
              "Client-ID" => "#{ENV['client_id_token']}",
              "Authorization" => "#{ENV['authorization_bearer_token']}"
            },
            :body => "search \"#{game_title}\"; fields name, cover.image_id; limit 50;"
          )
          
          render json: response.body
    end

    def show_game
        game_id = params[:_json]
        game = Game.find_by(api_id: game_id)
        if game
            review = Review.find_by(user_id: current_user.id, game_id: game.id)
            wishlist = Wishlist.find_by(user_id: current_user.id, game_id: game.id)
        end

        response = HTTParty.post("https://api.igdb.com/v4/games",

            :headers => {
              "Content-Type" => "text/plain",
              "Client-ID" => "#{ENV['client_id_token']}",
              "Authorization" => "#{ENV['authorization_bearer_token']}"
            },
            :body => "fields name, cover.image_id, total_rating; where id = #{game_id};"
          )

          api_game = JSON.parse(response.body)

          render json: {game: api_game[0], review: review, wishlist: wishlist}, status: :ok
    end


    private

    def game_params
        params.permit(:api_id, :title, :image_id, :total_rating)
    end

end
