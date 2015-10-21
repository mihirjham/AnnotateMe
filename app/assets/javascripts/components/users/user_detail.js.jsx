(function(root) {
  'use strict';

  var UserDetail = root.UserDetail = React.createClass({
    getInitialState: function(){
      return {user: UserStore.currentUser()};
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
          <div className="user_activity">
            <ul className="nav nav-tabs">
              <li><a>Annotations
                <span className="badge">{this.state.user.annotations.length}</span>
              </a></li>
            </ul>
            <div className="annotations-feed">
              <div className="annotations">
                {
                  this.state.user.annotations.map(function(annotation){
                    return(
                      <div className="annotation-feed-item">
                        <blockquote>
                          <p>{annotation.snippet}</p>
                          <footer>
                            {annotation.song_name} by {this.state.user.email}
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
            </div>
          </div>
        </div>
      );
    }
  });

}(this));
