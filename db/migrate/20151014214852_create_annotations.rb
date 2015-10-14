class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.integer :song_id, null: false
      t.integer :user_id, null: false
      t.integer :start, null: false
      t.integer :end, null: false
      t.text :annotation, null: false
      t.timestamps null: false
    end

    add_index :annotations, :song_id
    add_index :annotations, :user_id
  end
end
