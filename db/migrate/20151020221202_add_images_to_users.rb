class AddImagesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :cloudinary_url, :string
  end
end
