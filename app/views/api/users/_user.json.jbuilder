json.extract! user, :id, :email, :cloudinary_url, :created_at, :updated_at

json.annotations do
  json.array! user.annotations do |annotation|
    json.partial! "/api/annotations/annotation", annotation: annotation
  end
end

json.comments do
  json.array! user.comments do |comment|
    json.partial! "/api/comments/comment", comment: comment
  end
end
