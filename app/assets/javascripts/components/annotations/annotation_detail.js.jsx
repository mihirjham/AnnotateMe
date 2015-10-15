(function(root) {
  'use strict';

  var AnnotationDetail = root.AnnotationDetail = React.createClass({
    getInitialState: function(){
      return this.getStateFromStore();
    },
    getStateFromStore: function(){
      var annotation = SongStore.findAnnotation(parseInt(this.props.params.annotationId));
      return {annotation: annotation};
    },
    componentDidMount: function(){
      SongStore.addChangeListener(this._onChange);
      ApiUtil.fetchSong(parseInt(this.props.params.songId));
    },
    componentWillUnmount: function( ){
      SongStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(newProps){
      ApiUtil.fetchSong(parseInt(newProps.params.songId));
    },
    _onChange: function(){
      this.setState(this.getStateFromStore());
    },
    render: function(){
      return(
        <div>
          Annotation:
          {
            this.state.annotation.annotation
          }
        </div>
      );
    }
  });
}(this));
