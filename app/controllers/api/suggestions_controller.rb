class Api::SuggestionsController < ApplicationController

    def index
        suggestions = Suggestion.where(receiver_id: current_user.id)
        sorted = suggestions.sort_by{|m| m[:created_at]}.reverse
        render json: sorted, status: :ok
    end

    def create
        if params[:receiver_id].to_i == current_user.id
            render json: {errors: "You can't send a suggestion to yourself"}, status: :forbidden
        elsif current_user.friend_ids.include?(params[:receiver_id].to_i)
            new_suggestion = Suggestion.create!(sender_id: current_user.id, receiver_id: params[:receiver_id], api_id: params[:api_id], title: params[:title])
            render json: new_suggestion, status: :created
        else
            render json: {errors: "You are not friends with this user"}, status: :unauthorized
        end
    end

end
