# == Schema Information
#
# Table name: comments
#
#  id               :integer          not null, primary key
#  comment          :text             not null
#  user_id          :integer          not null
#  commentable_id   :integer          not null
#  commentable_type :string           not null
#  created_at       :datetime
#  updated_at       :datetime
#

class Comment < ActiveRecord::Base
  validates :user_id, :commentable_id, :commentable_type, :comment, presence: true
  validates :commentable_type, inclusion: {in: ['Song', 'Artist']}

  belongs_to :commentable, polymorphic: true

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
end
