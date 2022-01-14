class RemoveGameFromLists < ActiveRecord::Migration[6.1]
  def change
    remove_reference :lists, :game, null: false, foreign_key: true
  end
end
