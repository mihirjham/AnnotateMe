(function(root) {
  'use strict';

  var AnnotationForm = root.AnnotationForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function(){
      return {song_id: "", start_index: "", end_index: "", annotation: ""};
    },
    handleSubmit: function(){
      var newAnnotation = {
        song_id: this.props.params.songId,
        start_index: this.props.location.query.start_index,
        end_index: this.props.location.query.end_index,
        annotation: this.state.annotation
      };

      ApiUtil.createAnnotation(this.props.params.songId, newAnnotation);
      this.history.pushState(null, "/songs/" + this.props.params.songId);
     },
    render: function(){
      return(
        <div className="col-md-6">
          <form onSubmit={this.handleSubmit}>
            <div>
              <textarea placeholder="Say something interesting"
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
