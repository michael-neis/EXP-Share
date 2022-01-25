class MessageSerializer < ActiveModel::Serializer
  attributes :id, :created_at, :message, :receiver_id, :sender_id

  has_one :sender
  has_one :receiver
end
