module SessionsHelper
  def session_params
    params.require(:user).permit(:email, :password)
  end
end
