if @comment.commentable_type == "Song"
  json.partial! "/api/songs/song", song: @song, annotations: @annotations.includes(:user)
elsif @comment.commentable_type == "Artist"
  json.partial! "/api/artists/artist", artist: @artist
end
