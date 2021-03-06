class Api::ArtistsController < ApplicationController
  include Api::ArtistsHelper
  before_action :redirect_if_logged_out

  def index
    if(params[:name])
      @artists = Artist.includes(songs: [:annotations, :comments]).find_by_name(params[:name])
      render :index
    end
  end

  def create
    @artist = Artist.new(artist_params)

    if @artist.save
      render @artist
    else
      render json: {errors: @artist.errors.full_messages}, status: 422
    end
  end

  def show
    @artist = Artist.includes(songs: [:annotations, :comments]).find(params[:id])
    render :show
  end

  def update
    @artist = Artist.includes(songs: [:annotations, :comments]).find(params[:id])

    if @artist.update(artist_params)
      render :show
    else
      render json: {errors: @artist.errors.full_messages}, status: 422
    end
  end
end
