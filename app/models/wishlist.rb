class Wishlist < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates_uniqueness_of :game, :scope => :user
end
