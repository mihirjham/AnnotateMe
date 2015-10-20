module Api::ArtistsHelper
  def artist_params
    params.require(:artist).permit(:name, :cloudinary_url)
  end
end
