json.extract! artist, :id, :name, :cloudinary_url, :created_at, :updated_at

json.songs do
  json.array! artist.songs do |song|
    json.partial! "/api/songs/song", song: song, annotations: song.annotations.order(:start_index)
  end
end

json.comments do
  json.array! artist.comments do |comment|
    json.partial! "/api/comments/comment", comment: comment
  end
end
