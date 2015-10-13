class UsersController < ApplicationController
  include UsersHelper

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

end
