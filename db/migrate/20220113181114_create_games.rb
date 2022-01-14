class CreateGames < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.integer :api_id
      t.string :title
      t.string :cover_image
      t.float :total_rating

      t.timestamps
    end
  end
end
