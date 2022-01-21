class NonfriendUserSerializer < ActiveModel::Serializer
    attributes :id, :username, :bio, :profile_pic, :friend_bool
  
    has_many :lists
    has_many :reviews
    has_many :wishlists
  
    def friend_bool
      false
    end
end
