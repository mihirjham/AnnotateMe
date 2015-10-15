module Api::AnnotationsHelper
  def annotation_params
    params.require(:annotation).permit(:song_id, :start_index, :end_index, :annotation)
  end
end
