json.extract! song, :id, :name, :lyrics, :album_id, :release_date, :created_at, :updated_at

json.annotations do
  json.array! song.annotations do |annotation|
    json.partial! "/api/annotations/annotation", annotation: annotation
  end
end
