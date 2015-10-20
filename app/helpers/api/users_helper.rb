module Api::UsersHelper
  def user_params
    params.require(:user).permit(:email, :cloudinary_url)
  end
end
