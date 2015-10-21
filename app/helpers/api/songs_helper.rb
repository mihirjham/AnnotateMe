module Api::SongsHelper
  def song_params
    params.require(:song).permit(:name, :lyrics, :artist_id, :album_id, :release_date, :song_url)
  end
end
