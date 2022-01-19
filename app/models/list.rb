class List < ApplicationRecord
  belongs_to :user
  has_many :list_items, dependent: :destroy
  has_many :games, through: :list_items

  validates :list_name, presence: true
  validates_uniqueness_of :list_name, :scope => :user
end
