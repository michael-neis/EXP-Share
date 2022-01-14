class ListSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :list_name, :public

  has_many :list_items
end
