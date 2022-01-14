class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :list_id

  has_one :game
end
