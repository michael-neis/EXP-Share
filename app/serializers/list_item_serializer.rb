class ListItemSerializer < ActiveModel::Serializer
  attributes :id, :game_id, :list_id, :game

  def game
    object.game
  end
end
