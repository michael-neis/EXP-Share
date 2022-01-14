class Game < ApplicationRecord
    has_many :reviews
    has_many :wishlists
    has_many :list_items
    has_many :lists, through: :list_items
    has_many :review_users, through: :reviews, source: :user
    has_many :wishlist_users, through: :wishlists, source: :user

    validates :api_id, presence: true, numericality: { only_integer: true }, uniqueness: true
end
