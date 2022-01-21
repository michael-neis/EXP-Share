class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :list_id, :game

  has_one :game
end
