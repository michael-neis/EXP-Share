class Review < ApplicationRecord
  belongs_to :user
  belongs_to :game

  validates :rating, presence: true, numericality: { only_integer: true }
  validates :user_id, :game_id, presence: true
  validates_uniqueness_of :game, :scope => :user
end
