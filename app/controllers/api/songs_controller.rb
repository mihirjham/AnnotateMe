class Api::SongsController < ApplicationController
  include Api::SongsHelper
  before_action :redirect_if_logged_out, only: [:create, :update]

  def index
    if(params[:search])
      @songs = Song.includes(:annotations).find_by_substring(params[:search])
    else
      @songs = Song.includes(:annotations).all
    end

    render :index
  end

  def create
    @song = Song.new(song_params)
    @annotations = @song.annotations.order(:start_index)

    if @song.save
      render :show
    else
      render json: {errors: @song.errors.full_messages}, status: 422
    end
  end

  def show
    @song = Song.includes(:annotations, :artist).find(params[:id])
    @annotations = @song.annotations.order(:start_index)
    
    if @song
      render :show
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
