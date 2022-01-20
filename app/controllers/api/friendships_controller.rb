class Api::FriendshipsController < ApplicationController

    def index
        render json: current_user.friends, status: :ok
    end

    def create
        req = FriendRequest.find(params[:req_id])
        if req.receiver_id != current_user.id
            render json: {errors: "Access denied"}, status: :forbidden
        elsif current_user.friend_ids.include?(params[:sender_id])
            render json: {errors: "You are already friends"}
        else
            user = User.find(params[:sender_id])
            Friendship.create!(friend_a_id: current_user.id, friend_b_id: params[:sender_id])
            req.destroy
            render json: user, status: :created
        end
    end

    def destroy
        option1 = Friendship.find_by(friend_a_id: current_user.id, friend_b_id: params[:id])
        option2 = Friendship.find_by(friend_b_id: current_user.id, friend_a_id: params[:id])
        if option1
            option1.destroy
            head :no_content
        elsif option2
            option2.destroy
            head :no_content
        else
            render json: {errors: "Access denied"}, status: :forbidden
        end
    end

end
