json.extract! song, :id, :name, :lyrics, :artist_id, :album_id, :release_date, :song_url, :created_at, :updated_at

json.annotations do
  json.array! annotations do |annotation|
    json.partial! "/api/annotations/annotation", annotation: annotation
  end
end

json.artist_name song.artist.name
