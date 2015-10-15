json.array! @songs do |song|
  json.partial! "/api/songs/song", song: song, annotations: song.annotations.order(:start_index)
end
