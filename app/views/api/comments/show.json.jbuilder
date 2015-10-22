if @comment.commentable_type == "Song"
  json.partial! "/api/songs/song", song: @song, annotations: @annotations.includes(:user)
end
