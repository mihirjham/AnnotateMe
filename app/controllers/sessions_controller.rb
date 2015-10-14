class SessionsController < ApplicationController
  include SessionsHelper
  before_action :redirect_if_logged_out, only: [:destroy]
  before_action :redirect_if_logged_in, except: [:destroy]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(session_params[:email], session_params[:password])

    if @user
      login!(@user)
      redirect_to "/"
    else
      flash.now[:errors] = ["Username and password combination doesn't exist"]
      @user = User.new(session_params)
      render :new
    end
  end

  def destroy
    logout!
    render json: {success: "true"}
  end
end
