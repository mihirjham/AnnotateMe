class Api::SongsController < ApplicationController
  include Api::SongsHelper

  def index
    @songs = Song.all
    render :index
  end

  def create
    @song = Song.new(song_params)

    if @song.save
      render :index
    else
      render json: errors: {@song.errors.full_messages}, status: 422
    end
  end

  def update
  end
end
