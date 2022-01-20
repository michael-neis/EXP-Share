class FriendRequestSerializer < ActiveModel::Serializer
  attributes :id, :receiver_id

  has_one :sender
end
