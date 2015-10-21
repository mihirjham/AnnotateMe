(function(root) {
  'use strict';

  var AnnotationForm = root.AnnotationForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function(){
      return {song_id: "", start_index: "", end_index: "", annotation: ""};
    },
    componentDidMount: function(){
      if(this.props.params.annotationId){
        ApiUtil.fetchSong(parseInt(this.props.params.songId));
        var annotation = SongStore.findAnnotation(parseInt(this.props.params.songId), parseInt(this.props.params.annotationId));
        this.setState({song_id: annotation.song_id,
                      start_index: annotation.start_index,
                      end_index: annotation.end_index,
                      annotation: annotation.annotation});
      }
    },
    handleSubmit: function(){
      if(this.props.params.annotationId){
        ApiUtil.editAnnotation(this.props.params.annotationId, this.state);
      }
      else{
        var newAnnotation = {
          song_id: this.props.params.songId,
          start_index: this.props.location.query.start_index,
          end_index: this.props.location.query.end_index,
          snippet: this.props.location.query.snippet,
          annotation: this.state.annotation
        };

        ApiUtil.createAnnotation(this.props.params.songId, newAnnotation);
      }
      this.history.pushState(null, "/songs/" + this.props.params.songId);
     },
    render: function(){
      return(
        <div className="col-md-6 annotation-container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <textarea className="annotation-form"
                        placeholder="Say something interesting"
                        rows="10" cols = "50"
                        valueLink={this.linkState("annotation")}/>
            </div>
            <input type="submit" value="Save"/>
          </form>
        </div>
      );
    }
  });
}(this));
