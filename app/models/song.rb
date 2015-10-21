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
#  artist_id    :integer          not null
#  song_url     :string
#

class Song < ActiveRecord::Base
  validates :name, :lyrics, presence: true
  before_save :fix_song_url

  has_many :annotations,
    class_name: "Annotation",
    foreign_key: :song_id,
    primary_key: :id,
    dependent: :destroy

  belongs_to :artist,
    class_name: "Artist",
    foreign_key: :artist_id,
    primary_key: :id


  def self.find_by_substring(str)
    Song.where("LOWER(name) LIKE '%#{str.downcase}%'");
  end

  private
  def fix_song_url
    if self.song_url.match("youtube")
      url = self.song_url.dup
      url = "https://www.youtube.com/embed/#{url.split("=").last}"
      self.song_url = url
    else
      self.song_url = nil
    end
  end
end
