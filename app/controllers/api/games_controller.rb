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

    # def game_test

    #     game_id = params[:game_id]

    #     response = HTTParty.post("https://api.igdb.com/v4/games",

    #         :headers => {
    #           "Content-Type" => "text/plain",
    #           "Client-ID" => "#{ENV['client_id_token']}",
    #           "Authorization" => "#{ENV['authorization_bearer_token']}"
    #         },
    #         :body => "fields *, collection.name, collection.games.name, cover.url, platforms.name, platforms.platform_logo.url;  where id = #{game_id};"
    #       )
          
    #       render json: response.body
    # end

    def search_games

        game_title = params[:_json]

        response = HTTParty.post("https://api.igdb.com/v4/games",

            :headers => {
              "Content-Type" => "text/plain",
              "Client-ID" => "#{ENV['client_id_token']}",
              "Authorization" => "#{ENV['authorization_bearer_token']}"
            },
            :body => "search \"#{game_title}\"; fields name, cover.image_id; limit 75;"
          )
          
          render json: response.body
    end

    def show_game
        game_id = params[:_json]
        game = Game.find_by(api_id: game_id)
        if game
            review = Review.find_by(user_id: current_user.id, game_id: game.id)
            wishlist = Wishlist.find_by(user_id: current_user.id, game_id: game.id)
            review_array = game.reviews
            db_id = game.id
        end

        lists = current_user.lists

        response = HTTParty.post("https://api.igdb.com/v4/games",

            :headers => {
              "Content-Type" => "text/plain",
              "Client-ID" => "#{ENV['client_id_token']}",
              "Authorization" => "#{ENV['authorization_bearer_token']}"
            },
            :body => "fields name, cover.image_id, total_rating, summary, genres.name, platforms.websites.url, platforms.name, platforms.platform_logo.image_id, collection.name; where id = #{game_id};"
          )

          api_game = JSON.parse(response.body)

          render json: {game: api_game[0], review: review, wishlist: wishlist, lists: lists, db_id: db_id, review_array: review_array}, status: :ok
    end
 
    def collection
        collection_id = params[:collection_id]

        response = HTTParty.post("https://api.igdb.com/v4/collections",

            :headers => {
              "Content-Type" => "text/plain",
              "Client-ID" => "#{ENV['client_id_token']}",
              "Authorization" => "#{ENV['authorization_bearer_token']}"
            },
            :body => "fields name, games.name, games.cover.image_id; where id = #{collection_id};"
          )

          render json: response.body

    end

    
    def discover
        if current_user.reviews.length == 0
            render json: {message: 'no reviews'}, status: :unauthorized
        elsif current_user.top_games.length < 6

            all_games = []
            reviewed_games = current_user.reviews.map{|r| r.game.api_id}

            current_user.top_games.each do |g|

            top_game_id = g.game.api_id

            response = HTTParty.post("https://api.igdb.com/v4/games",

                :headers => {
                  "Content-Type" => "text/plain",
                  "Client-ID" => "#{ENV['client_id_token']}",
                  "Authorization" => "#{ENV['authorization_bearer_token']}"
                },
                :body => "fields similar_games.name, similar_games.cover.image_id; where id = #{top_game_id};"
              )
              
              res_hash = JSON.parse(response.body)[0]
              game_array = res_hash["similar_games"]

              game_array.each{|g| all_games << g}

            end
          
            no_reviewed_games = all_games.filter{|g| reviewed_games.exclude?(g["id"])}
            no_duplicates = no_reviewed_games.uniq
            sample_games = no_duplicates.sample(16)
            render json: sample_games, status: :ok

        else

            sample_top_games = current_user.top_games.sample(5)

            all_games = []
            reviewed_games = current_user.reviews.map{|r| r.game.api_id}

            sample_top_games.each do |g|

            top_game_id = g.game.api_id

            response = HTTParty.post("https://api.igdb.com/v4/games",

                :headers => {
                  "Content-Type" => "text/plain",
                  "Client-ID" => "#{ENV['client_id_token']}",
                  "Authorization" => "#{ENV['authorization_bearer_token']}"
                },
                :body => "fields similar_games.name, similar_games.cover.image_id; where id = #{top_game_id};"
              )
              
              res_hash = JSON.parse(response.body)[0]
              game_array = res_hash["similar_games"]
   
              game_array.each{|g| all_games << g}

            end
          
            no_reviewed_games = all_games.filter{|g| reviewed_games.exclude?(g["id"])}
            no_duplicates = no_reviewed_games.uniq
            sample_games = no_duplicates.sample(16)
            render json: sample_games, status: :ok

        end
    end

    private

    def game_params
        params.permit(:api_id, :title, :image_id, :total_rating)
    end

end
