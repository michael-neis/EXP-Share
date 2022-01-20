class Friendship < ApplicationRecord

    belongs_to :friend_a, class_name: :User
    belongs_to :friend_b, class_name: :User

    validates :friend_a, :friend_b, presence: true
    validates_uniqueness_of :friend_a, :scope => :friend_b
end
