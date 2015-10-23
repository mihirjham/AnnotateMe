(function(root) {
  'use strict';

  var strSplice = function(str, index, count, add){
    return str.slice(0, index) + (add || "") + str.slice(index + count);
  };

  var UserDetail = root.UserDetail = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {user: UserStore.currentUser(), selectedPane: "annotations"};
    },
    componentDidMount: function(){
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUser(this.props.params.id);
    },
    componentWillUnmount: function(){
      UserStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(){
      ApiUtil.fetchUser(this.props.params.id);
    },
    _onChange: function(){
      this.setState({user: UserStore.currentUser()});
    },
    handleProfilePictureClick: function(){
      cloudinary.openUploadWidget({cloud_name: window.CLOUD_NAME, upload_preset: window.UPLOAD_PRESET}, function(error, result){
        ApiUtil.editUser(this.props.params.id, {cloudinary_url: result[0].secure_url});
      }.bind(this));
    },
    handleSongClick: function(annotation){
      this.history.pushState(null, "/songs/" + annotation.song_id.toString());
    },
    handleAnnotationsClick: function(){
      this.setState({selectedPane: "annotations"});
    },
    handleCommentsClick: function(){
      this.setState({selectedPane: "comments"});
    },
    formatAnnotations: function(){
      var annotations = document.getElementsByClassName("annotation-feed-annotation");

      for(var i = 0; i < annotations.length; i++){
        var content = annotations[i].innerHTML;
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
        annotations[i].innerHTML = content;
      }
    },
    formatComments: function(){
      var comments = document.getElementsByClassName("comment");

      for(var i = 0; i < comments.length; i++){
        var content = comments[i].innerHTML;
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
        comments[i].innerHTML = content;
      }
    },
    componentDidUpdate: function(){
      this.formatAnnotations();
      this.formatComments();
    },
    render: function(){
      if(this.state.user === undefined){
        return(<div></div>);
      }

      var button;
      if(window.CURRENT_USER.toString() === this.props.params.id){
        button = <button onClick={this.handleProfilePictureClick}>Add Profile Picture</button>;
      }
      else{
        button = <div></div>;
      }
      var img = <img className="artist_image" src={this.state.user.cloudinary_url}/>;

      var annotations = <div className="annotations-feed tab-pane">
                      <div className="annotations">
                        {
                          this.state.user.annotations.map(function(annotation){
                            return(
                              <div key={annotation.id} className="annotation-feed-item">
                                <blockquote>
                                  <p className="annotation-snippet">{annotation.snippet}</p>
                                  <footer>
                                    <a onClick={this.handleSongClick.bind(null, annotation)}>{annotation.song_name}</a> by {this.state.user.email}
                                  </footer>
                                </blockquote>
                                <p className="annotation-feed-annotation">
                                  {annotation.annotation}
                                </p>
                              </div>
                            );
                          }.bind(this))
                        }
                      </div>
                    </div>;

        var comments =  <div className="comments-feed">
                        <div className="comments">
                          {
                            this.state.user.comments.map(function(comment){
                              return(
                                <div key={comment.id} className="comments-feed-item">
                                  <blockquote>
                                    <p className="comment">{comment.comment}</p>
                                    <footer>
                                      {comment.name}
                                    </footer>
                                  </blockquote>
                                </div>
                              );
                            })
                          }
                        </div>
                      </div>;

      return(
        <div className="user_page">
          <div className="user_information">
            <div>
              {
                this.state.user.cloudinary_url === null ? button : img
              }
            </div>
            <div className="user_email"><h1>{this.state.user.email}</h1></div>
          </div>
          <div className="user_activity" >
            <ul className="nav nav-tabs">
              <li><a onClick={this.handleAnnotationsClick}>Annotations
                <span className="badge">{this.state.user.annotations.length}</span>
              </a></li>
              <li><a onClick={this.handleCommentsClick}>Comments
                <span className="badge">{this.state.user.comments.length}</span>
              </a></li>
            </ul>
            {this.state.selectedPane === "annotations" ? annotations : comments}
          </div>
        </div>
      );
    }
  });

}(this));
