# == Schema Information
#
# Table name: annotations
#
#  id         :integer          not null, primary key
#  song_id    :integer          not null
#  user_id    :integer          not null
#  start      :integer          not null
#  end        :integer          not null
#  annotation :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Annotation < ActiveRecord::Base
  validates :song_id, :user_id, :start, :end, :annotation, presence: true

  belongs_to :song,
    class_name: "Song",
    foreign_key: :song_id,
    primary_key: :id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
end
