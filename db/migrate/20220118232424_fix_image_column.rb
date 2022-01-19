class FixImageColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :games, :cover_image, :image_id
  end
end
