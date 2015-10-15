# == Schema Information
#
# Table name: annotations
#
#  id          :integer          not null, primary key
#  song_id     :integer          not null
#  user_id     :integer          not null
#  start_index :integer          not null
#  end_index   :integer          not null
#  annotation  :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Annotation < ActiveRecord::Base
  validates :song_id, :user_id, :start_index, :end_index, :annotation, presence: true
  validate :annotation_exists

  belongs_to :song,
    class_name: "Song",
    foreign_key: :song_id,
    primary_key: :id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id

    private
    def annotation_exists
      annotations = Annotation.where("(:id IS NULL) OR (id != :id)", id: self.id)
                              .where(song_id: self.song_id)
                              .where("NOT( (start_index > :end_index) OR (end_index < :start_index) )", start_index: self.start_index, end_index: self.end_index)

      unless annotations.empty?
        errors[:base] << "Annotation exists!"
      end
    end
end
