class FriendRequest < ApplicationRecord

    belongs_to :sender, class_name: :User
    belongs_to :receiver, class_name: :User

    validates :receiver, presence: true
    validates_uniqueness_of :receiver, :scope => :sender
end
