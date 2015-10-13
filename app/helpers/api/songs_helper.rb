module Api::SongsHelper
  def song_params
    params.require(:song).permit(:name, :lyrics, :album_id, :release_date)
  end
end
