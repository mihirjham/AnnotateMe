(function(root) {
  'use strict';

  var ArtistDetail = root.ArtistDetail = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {artist: ArtistStore.all()[0]};
    },
    componentDidMount: function(){
      ArtistStore.addChangeListener(this._onChange);
      ApiUtil.fetchArist(this.props.params.id);
    },
    componentWillUnmount: function(){
      ArtistStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState({artist: ArtistStore.all()[0]});
    },
    handleClick: function(song){
      this.history.pushState(null, "/songs/" + song.id.toString());
    },
    handleUpload: function(){
      cloudinary.openUploadWidget({cloud_name: window.CLOUD_NAME, upload_preset: window.UPLOAD_PRESET}, function(error, result){
        ApiUtil.editArtist(this.props.params.id, {cloudinary_url: result[0].secure_url});
      }.bind(this));
    },
    handleCommentCreate: function(comment, e){
      e.preventDefault();
      var newComment = {
        comment: comment,
        commentable_id: this.props.params.id,
        commentable_type: "Artist"
      };

      ApiUtil.createComment(this.props.params.id, newComment);
    },
    handleDeleteComment: function(id){
      ApiUtil.deleteComment(id);
    },
    render: function(){
      if(this.state.artist === undefined){
        return <div></div>;
      }
      var uploadButton = <button className="artist_image_upload_button" onClick={this.handleUpload}>Upload Picture</button>;
      var img = <img className="artist_image" src={this.state.artist.cloudinary_url}/>;

      return(
        <div>
          <div><h1>{this.state.artist.name}</h1></div>
          <div>
            {this.state.artist.cloudinary_url === null ? uploadButton : img }
          </div>
          <div className="song_column">
            Songs
            <ul className="song_list">
              {
                this.state.artist.songs.map(function(song){
                  return <li key={song.id}><a onClick={this.handleClick.bind(null, song)}>{song.name}</a></li>;
                }.bind(this))
              }
            </ul>
          </div>
          <CommentsIndex comments={this.state.artist.comments}
                         handleCommentCreate={this.handleCommentCreate}
                         handleDeleteComment={this.handleDeleteComment}/>
        </div>
      );
    }
  });
}(this));
