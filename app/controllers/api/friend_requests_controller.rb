class Api::FriendRequestsController < ApplicationController


    def create
        if params[:receiver_id] == current_user.id
            render json: {errors: "You can't send a request to yourself"}, status: :forbidden
        elsif current_user.friend_ids.include?(params[:receiver_id])
            render json: {errors: "You are already friends"}
        else
            new_request = FriendRequest.create!(sender_id: current_user.id, receiver_id: params[:receiver_id])
            render json: new_request, status: :created
        end
    end

    def show
        if params[:id] == "#{current_user.id}"
            requests = FriendRequest.where(receiver_id: current_user.id)
            render json: requests, status: :ok
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

    def destroy
        req = FriendRequest.find(params[:id])
        if req.sender_id == current_user.id || req.receiver_id == current_user.id
            req.destroy
            head :no_content
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

end
