class AddImageUrlToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :cloudinary_url, :string
  end
end
