class Api::AnnotationsController < ApplicationController
  include Api::AnnotationsHelper

  def create
    @annotation = current_user.annotations.new(annotation_params)

    if @annotation.save
      @song = Song.includes(:annotations).find(params[:song_id])
      @annotations = @song.annotations.order(:start_index)
      render :show
    else
      render json: {errors: @annotation.errors.full_messages}, status: 422
    end
  end
end
