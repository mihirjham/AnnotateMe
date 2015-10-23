class Api::CommentsController < ApplicationController
  include Api::CommentsHelper

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save
      if @comment.commentable_type == "Song"
        @song = @comment.commentable
        @annotations = @song.annotations.order(:start_index)
        render :show
      end
    else
      render json: {errors: @comment.errors.full_messages}, status: 422
    end

  end

  def destroy
    @comment = Comment.find(params[:id])

    if @comment.destroy
      if @comment.commentable_type == "Song"
        @song = @comment.commentable
        @annotations = @song.annotations.order(:start_index)
        render :show
      end
    else
      render json: {errors: "Comment cannot be deleted"}, status: 422
    end
  end

end
