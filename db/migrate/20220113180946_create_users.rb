class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.text :bio
      t.string :profile_pic

      t.timestamps
    end
  end
end
