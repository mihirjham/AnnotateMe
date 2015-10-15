json.array! @songs do |song|
  json.partial! "/api/songs/song", song: song, annotations: song.annotations.sort {|annotation| annotation.start_index}
end
