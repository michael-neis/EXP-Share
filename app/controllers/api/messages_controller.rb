class Api::MessagesController < ApplicationController

    def show
        if params[:id].to_i == current_user.id
            render json: {errors: "You can't have any messages with yourself"}, status: :forbidden
        elsif current_user.friend_ids.include?(params[:id].to_i)
            sent_messages = Message.where(sender_id: current_user.id, receiver_id: params[:id])
            received_messages = Message.where(sender_id: params[:id], receiver_id: current_user.id)
            total_messages = received_messages + sent_messages
            sorted = total_messages.sort_by{|m| m[:created_at]}
            render json: sorted, status: :ok
        else
            render json: {error: "You are not friends with this user"}, status: :unauthorized
        end
    end

    def create
        if params[:receiver_id] == current_user.id
            render json: {errors: "You can't send a request to yourself"}, status: :forbidden
        elsif current_user.friend_ids.include?(params[:receiver_id])
            new_message = Message.create!(sender_id: current_user.id, receiver_id: params[:receiver_id], message: params[:message])
            render json: new_message, status: :created
        else
            render json: {error: "You are not friends with this user"}, status: :unauthorized
        end
    end

end
