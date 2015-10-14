# == Schema Information
#
# Table name: songs
#
#  id           :integer          not null, primary key
#  name         :string           not null
#  lyrics       :text             not null
#  album_id     :integer
#  release_date :date
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#

class Song < ActiveRecord::Base
  validates :name, :lyrics, presence: true

  has_many :annotations,
    class_name: "Annotation",
    foreign_key: :song_id,
    primary_key: :id,
    dependent: :destroy

  def self.find_by_substring(str)
    Song.where("LOWER(name) LIKE '%#{str.downcase}%'");
  end
end
