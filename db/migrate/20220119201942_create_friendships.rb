class CreateFriendships < ActiveRecord::Migration[6.1]
  def change
    create_table :friendships do |t|
      t.integer :friend_a_id
      t.integer :friend_b_id

      t.timestamps
    end
  end
end
