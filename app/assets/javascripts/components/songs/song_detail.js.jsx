(function(root) {
  'use strict';

    var isSubString = function(haystack, needle){
      for(var i = 0; i < haystack.length; i++){
        var j = i;
        var k = 0;

        while(haystack[j] === needle[k] && j < haystack.length && k < needle.length){
          j++;
          k++;
        }

        if(k === needle.length){
          return i;
        }
      }
      return -1;
  };

  var strSplice = function(str, index, count, add){
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  };

  var SongDetail = root.SongDetail = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {song: {annotations: [{start: 0, end: 5}]}};
    },
    componentDidMount: function(){
      SongStore.addChangeListener(this._onChange);
      ApiUtil.fetchSong(parseInt(this.props.params.songId));
    },
    componentWillUnmount: function(){
      SongStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(){
      ApiUtil.fetchSong(parseInt(this.props.params.songId));
    },
    _onChange: function(){
      this.setState({song: SongStore.getSongById(parseInt(this.props.params.songId))});
    },
    handleEdit: function(){
      this.history.pushState(null, "/songs/" + this.props.params.songId + "/edit");
    },
    handleSelect: function(e){
      var userSelection;
      if (window.getSelection) {
          userSelection = window.getSelection();
      }
      else if (document.selection) {
        userSelection = document.selection.createRange();
      }

      var selectedText = userSelection;
      if (userSelection.text) {
        selectedText = userSelection.text;
      }

      if (selectedText.toString() !== '') {
        var relativeIndex = isSubString(this.state.song.lyrics, selectedText.anchorNode.data);
        var startIndex = relativeIndex + selectedText.anchorOffset;
        var endIndex = relativeIndex + selectedText.focusOffset;

        if(endIndex < startIndex){
          var temp  = startIndex;
          startIndex = endIndex;
          endIndex = temp;
        }

        this.history.pushState(null, "/songs/"+this.props.params.songId +
                                    "/annotations/new",
                                    {start_index: startIndex,
                                     end_index: endIndex,
                                     snippet: this.state.song.lyrics.substring(startIndex, endIndex),
                                     pageYOffset: window.pageYOffset
                                    });
      }
    },
    handleAnnotationClick: function(annotation){
      this.history.pushState(null, "/songs/" + this.props.params.songId + "/annotations/" + annotation.id, {pageYOffset: window.pageYOffset});
    },
    formatText: function(){
        $(".lyrics").empty();
        var lyrics = this.state.song.lyrics.split("");

        var annotationIndex = [];
        var annotationCount = 0;

        for(var i = 0; i < this.state.song.annotations.length; i++){
          annotationIndex.push(this.state.song.annotations[i].start_index);
        }

        for(i = 0; i < lyrics.length; i++){
          if(annotationIndex.indexOf(i) !== -1){
            var annotation = this.state.song.annotations[annotationCount];
            var text = this.state.song.lyrics.slice(annotation.start_index, annotation.end_index);
            var $anchor;
            if(parseInt(this.props.params.annotationId) === annotation.id){
              $anchor = $("<a class='selected'></a>");
            }
            else{
              $anchor = $("<a></a>");
            }
            $anchor.html(text);
            $anchor.on("click", this.handleAnnotationClick.bind(null, annotation));
            $(".lyrics").append($anchor);
            i = annotation.end_index-1;
            annotationCount++;
            continue;
          }
          else{
            var unannotated = "";
            while(i < lyrics.length && annotationIndex.indexOf(i) === -1){
              unannotated += lyrics[i];
              i++;
            }
            $(".lyrics").append(unannotated);
            i--;
          }
        }

        if(this.props.location.query.pageYOffset){
          window.scrollTo(0, parseInt(this.props.location.query.pageYOffset));
        }
    },
    formatComments: function(){
      var comments = document.getElementsByClassName("comment");
      for(var i = 0; i < comments.length; i++){
        var comment = comments[i];
        var content = comment.innerHTML;
        var index = 0;

        var urls = content.match(/(?:^|[^"'])(\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|])/gim);

        if(urls === null){
          continue;
        }

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
        comment.innerHTML = content;
      }
    },
    handleArtistClick: function(id){
      this.history.pushState(null, "/artists/" + id.toString());
    },
    componentDidUpdate: function () {
      this.formatText();
      this.formatComments();
    },
    handleCommentCreate: function(comment, e){
      e.preventDefault();
      var newComment = {
        comment: comment,
        commentable_id: this.props.params.songId,
        commentable_type: "Song"
      };

      ApiUtil.createComment(this.props.params.songId, newComment);
    },
    handleDeleteComment: function(id){
      ApiUtil.deleteComment(id);
    },
    render: function(){
      var mediaPlayer;
      if(this.state.song.song_url === null){
        mediaPlayer = <button className="add-song-button" onClick={this.handleEdit}>Add Song Link</button>;
      }else {
        mediaPlayer = <iframe width="560" height="315" src={this.state.song.song_url}/>;
      }
      return(
        <div className="col-md-6">
          <div className="song_info">
            <div className="media-player">
              {mediaPlayer}
            </div>
            <h1 className="title_and_authors">
              <span className="title">{this.state.song.name}</span>
              <span className="type">Lyrics</span>
              <div className="artist"><a onClick={this.handleArtistClick.bind(null, this.state.song.artist_id)}>{this.state.song.artist_name}</a></div>
            </h1>
          </div>
          <div className="song_body">
            <div className="lyrics-container" onMouseUp={this.handleSelect}>
              <p className="lyrics">
              </p>
            </div>
          </div>
          <button onClick={this.handleEdit}>Edit Song</button>
          <CommentsIndex comments={this.state.song.comments}
                         handleCommentCreate={this.handleCommentCreate}
                         handleDeleteComment={this.handleDeleteComment}/>
        </div>
      );
    }
  });
}(this));
