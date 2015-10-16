class AddArtistToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :artist_id, :integer, null: false
    add_index :songs, :artist_id
  end
end
