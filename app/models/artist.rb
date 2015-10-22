# == Schema Information
#
# Table name: artists
#
#  id             :integer          not null, primary key
#  name           :string           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  cloudinary_url :string
#

class Artist < ActiveRecord::Base
  validates :name, presence: true, uniqueness: true

  has_many :songs,
    class_name: "Song",
    foreign_key: :artist_id,
    primary_key: :id,
    dependent: :destroy

  has_many :comments, as: :commentable, dependent: :destroy

  def self.find_by_name(name)
    Artist.where("LOWER(name) LIKE '%#{name.downcase}%'")
  end
end
