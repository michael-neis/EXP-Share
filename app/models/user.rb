class User < ApplicationRecord
    has_secure_password

    has_many :lists
    has_many :reviews
    has_many :wishlists
    has_many :list_items, through: :lists
    has_many :reviewed_games, through: :reviews, source: :game
    has_many :wishlist_games, through: :wishlists, source: :game
    
    has_many :friend_requests_as_sender, foreign_key: :sender_id, class_name: :FriendRequest
    has_many :friend_requests_as_receiver, foreign_key: :receiver_id, class_name: :FriendRequest

    has_many :messages_as_sender, foreign_key: :sender_id, class_name: :Message
    has_many :messages_as_receiver, foreign_key: :receiver_id, class_name: :Message

    has_many :friendships_as_friend_a, foreign_key: :friend_a_id, class_name: :Friendship
    has_many :friendships_as_friend_b, foreign_key: :friend_b_id, class_name: :Friendship
    has_many :friend_as, through: :friendships_as_friend_b
    has_many :friend_bs, through: :friendships_as_friend_a
    
    validates :profile_pic, url: { allow_blank: true }
    validates :username, presence: true, uniqueness: true

    def friends
        self.friend_as + self.friend_bs
    end

    def friend_ids
        self.friends.map{|f| f.id}
    end
end
