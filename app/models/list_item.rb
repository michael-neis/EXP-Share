class ListItem < ApplicationRecord
  belongs_to :list
  belongs_to :game

  validates :list_id, :game_id, presence: true
end
