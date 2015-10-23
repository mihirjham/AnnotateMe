class Api::UsersController < ApplicationController
  include Api::UsersHelper
  before_action :redirect_if_logged_out

  def show
    @user = User.includes(:comments).find(params[:id])
    render :show
  end

  def update
    @user = User.includes(:comments).find(params[:id])

    if @user.update(user_params)
      render :show
    else
      render json: {errors: @user.errors.full_messages}, status: 422
    end
  end

end
