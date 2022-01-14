class User < ApplicationRecord
    has_secure_password

    has_many :lists
    has_many :reviews
    has_many :wishlists
    has_many :reviewed_games, through: :reviews, source: :game
    has_many :wishlist_games, through: :wishlists, source: :game

    validates :profile_pic, url: { allow_blank: true }
    validates :username, presence: true, uniqueness: true
end
