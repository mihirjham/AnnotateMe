json.extract! comment, :id, :comment, :commentable_id, :commentable_type, :user_id, :created_at, :updated_at
json.email comment.user.email
json.name comment.commentable.name
