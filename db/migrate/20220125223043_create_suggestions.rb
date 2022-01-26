class CreateSuggestions < ActiveRecord::Migration[6.1]
  def change
    create_table :suggestions do |t|
      t.integer :sender_id
      t.integer :receiver_id
      t.integer :api_id
      t.string :title

      t.timestamps
    end
  end
end
