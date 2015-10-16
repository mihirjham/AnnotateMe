(function(root) {
  'use strict';

  var AnnotationDetail = root.AnnotationDetail = React.createClass({
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
    render: function(){
      if(this.state.annotation === undefined){
        return(<div></div>);
      }

      return(
        <div classname="col-md-6 annotation-div">
          Annotation:
          <pre className="annotation">
            {
              this.state.annotation.annotation
            }
          </pre>
        </div>
      );
    }
  });
}(this));
