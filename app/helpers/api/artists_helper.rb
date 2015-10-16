module Api::ArtistsHelper
  def artist_params
    params.require(:artist).permit(:name)
  end
end
