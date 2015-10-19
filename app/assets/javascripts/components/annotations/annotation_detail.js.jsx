(function(root) {
  'use strict';

  var AnnotationDetail = root.AnnotationDetail = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {annotation: this.getStateFromStore()};
    },
    getStateFromStore: function(){
      return SongStore.findAnnotation(parseInt(this.props.params.songId), parseInt(this.props.params.annotationId));
    },
    componentDidMount: function(){
      SongStore.addChangeListener(this._onChange);
      ApiUtil.fetchSong(parseInt(this.props.params.songId));
    },
    componentWillUnmount: function( ){
      SongStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(newProps){
      ApiUtil.fetchSong(parseInt(this.props.params.songId));
    },
    _onChange: function(){
      this.setState({annotation: this.getStateFromStore()});
    },
    handleEdit: function(){
      this.history.pushState(null, "/songs/" + this.props.params.songId + "/annotations/" + this.props.params.annotationId + "/edit");
    },
    handleDelete: function(){
      ApiUtil.deleteAnnotation(this.props.params.annotationId);
      this.history.pushState(null, "/songs/" + this.props.params.songId);
    },
    render: function(){
      if(this.state.annotation === undefined){
        return(<div></div>);
      }
      return(
        <div className="col-md-6 annotation-container">
          <div className="annotation-unit-label">
            <span className="annotation-label">Annotation</span>
            <span className="contributor-label">{this.state.annotation.email}</span>
          </div>
          <div className="annotation">
            <p>
              {
                this.state.annotation.annotation
              }
            </p>
          </div>
          {CURRENT_USER === this.state.annotation.user_id ? <button onClick={this.handleEdit}>Edit</button> : ""}
          {CURRENT_USER === this.state.annotation.user_id ? <button onClick={this.handleDelete}>Delete</button> : ""}
        </div>
      );
    }
  });
}(this));
