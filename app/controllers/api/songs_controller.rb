class Api::SongsController < ApplicationController
  include Api::SongsHelper
  before_action :redirect_if_logged_out, only: [:create, :update]

  def index
    @songs = Song.all
    render :index
  end

  def create
    @song = Song.new(song_params)

    if @song.save
      render @song
    else
      render json: {errors: @song.errors.full_messages}, status: 422
    end
  end

  def show
    @song = Song.find(params[:id])

    if @song
      render @song
    else
      render json: {errors: "No such song"}, status: 422
    end
  end

  def update
    @song = Song.find(params[:id])

    if @song.update(song_params)
      render @song
    else
      render json: {errors: @song.errors.full_messages}, status: 422
    end
  end
end
