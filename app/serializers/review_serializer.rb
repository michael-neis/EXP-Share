class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :created_at, :updated_at, :user_id, :game_id, :username, :title, :api_id, :image_id

  def username
    object.user.username
  end

  def title
    object.game.title
  end

  def api_id
    object.game.api_id
  end

  def image_id
    object.game.image_id
  end
end
