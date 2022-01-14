class List < ApplicationRecord
  belongs_to :user
  has_many :list_items
  has_many :games, through: :list_items

  validates :list_name, presence: true
end
