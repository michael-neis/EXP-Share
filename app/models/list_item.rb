class ListItem < ApplicationRecord
  belongs_to :list
  belongs_to :game

  validates :list_id, :game_id, presence: true
  validates_uniqueness_of :game_id, :scope => :list_id
end
