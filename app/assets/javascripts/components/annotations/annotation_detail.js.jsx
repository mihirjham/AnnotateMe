(function(root) {
  'use strict';

  var strSplice = function(str, index, count, add){
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  };

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
    handleUserClick: function(){
      this.history.pushState(null, "/users/" + this.state.annotation.user_id);
    },
    componentDidUpdate: function(){
      var content = document.getElementsByClassName("annotation-detail")[0].innerHTML;
      var index = 0;

      var urls = content.match(/(?:^|[^"'])(\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim);

      urls.forEach(function(url){
        var urlIndex = content.indexOf(url, index);

        if(url.match(/\.(png|jpeg|jpg|gif)$/) === null){
          if(content.indexOf("<a href", index) === -1){
            content = strSplice(content, urlIndex, url.length, "<a href='" + url + "'>" + url + "</a>");
            index += (url.length * 2) + 15;
          }
        }else{
          if(content.indexOf("<img src", index) === -1){
            content = strSplice(content, urlIndex, url.length, "<img src ='" + url + "' />");
            index += url.length + 14;
          }
        }
      });

      document.getElementsByClassName("annotation-detail")[0].innerHTML = content;
    },
    render: function(){
      if(this.state.annotation === undefined){
        return(<div></div>);
      }
      return(
        <div className="col-md-6 annotation-container">
          <div className="annotation-unit-label">
            <span className="annotation-label">Annotation</span>
            <span className="contributor-label"><a className=""onClick={this.handleUserClick}>{this.state.annotation.email}</a></span>
          </div>
          <div className="annotation">
            <p className="annotation-detail">
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
