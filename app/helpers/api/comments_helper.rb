module Api::CommentsHelper
  def comment_params
    params.require(:comment).permit(:comment, :commentable_id, :commentable_type)
  end
end
