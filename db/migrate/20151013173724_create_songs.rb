class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :name, null: false
      t.text :lyrics, null: false
      t.integer :album_id
      t.date :release_date
      t.timestamps null: false
    end

    add_index :songs, :album_id
  end
end
