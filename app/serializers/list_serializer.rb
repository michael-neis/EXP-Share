class ListSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :list_name, :public, :games

  has_many :list_items
  has_many :games
end
