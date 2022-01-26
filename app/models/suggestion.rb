class Suggestion < ApplicationRecord

    belongs_to :sender, class_name: :User
    belongs_to :receiver, class_name: :User

    validates :api_id, :title, :receiver, :sender, presence: true
    validates_uniqueness_of :api_id, :scope => [:sender, :receiver]

end
