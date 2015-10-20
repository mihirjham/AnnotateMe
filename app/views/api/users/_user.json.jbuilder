json.extract! user, :id, :email, :created_at, :updated_at

json.annotations do
  json.array! user.annotations do |annotation|
    json.partial! "/api/annotations/annotation", annotation: annotation
  end
end
