class Api::AnnotationsController < ApplicationController
  include Api::AnnotationsHelper
  before_action :redirect_if_logged_out

  def create
    @annotation = current_user.annotations.new(annotation_params)

    if @annotation.save
      @song = Song.includes(:annotations, comments:[:user]).find(params[:song_id])
      @annotations = @song.annotations.order(:start_index)
      render :show
    else
      render json: {errors: @annotation.errors.full_messages}, status: 422
    end
  end

  def update
    @annotation = Annotation.find(params[:id])

    if @annotation.user == current_user && @annotation.update(annotation_params)
      @song = @annotation.song
      @annotations = @song.annotations.order(:start_index)
      render :show
    else
      render json: {errors: @annotation.errors_full_messages}, status: 422
    end
  end

  def destroy
    @annotation = Annotation.find(params[:id])

    if @annotation.user == current_user && @annotation.destroy
      @song = @annotation.song
      @annotations = @song.annotations.order(:start_index)
      render :show
    else
      render json: {errors: @annotation.errors.full_messages}, status: 422
    end
  end
end
