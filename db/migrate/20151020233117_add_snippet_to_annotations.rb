class AddSnippetToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :snippet, :text, null: false
  end
end
