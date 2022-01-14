class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :created_at, :updated_at, :user_id, :game_id, :username, :title

  def username
    object.user.username
  end

  def title
    object.game.title
  end
end
