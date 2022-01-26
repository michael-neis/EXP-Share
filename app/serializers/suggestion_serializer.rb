class SuggestionSerializer < ActiveModel::Serializer
  attributes :id, :receiver_id, :api_id, :title, :created_at

  has_one :sender
end
