json.extract! artist, :id, :name, :created_at, :updated_at

json.songs do
  json.array! artist.songs do |song|
    json.partial! "/api/songs/song", song: song, annotations: song.annotations.order(:start_index)
  end
end
