class Message < ApplicationRecord

    belongs_to :sender, class_name: :User
    belongs_to :receiver, class_name: :User

    validates :message, :receiver, :sender, presence: true

end
