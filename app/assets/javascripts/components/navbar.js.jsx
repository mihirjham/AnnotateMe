(function(root) {
  'use strict';

  var Navbar = root.Navbar = React.createClass({
    mixins: [ReactRouter.History],
    handleSignOut: function(e){
      e.preventDefault();
      SessionUtil.signOut();
    },
    handleLogoClick: function(){
      this.history.pushState(null, "/");
    },
    handleNewSong: function(){
      this.history.pushState(null, "/songs/new");
    },
    handleProfileClick: function(){
      this.history.pushState(null, "/users/" + window.CURRENT_USER);
    },
    render: function(){

      var dropdown = <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{CURRENT_USER_EMAIL}<span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li><a onClick={this.handleProfileClick}>Profile</a></li>
          <li role="separator" className="divider"></li>
          <li><a onClick={this.handleNewSong}>Add Song</a></li>
          <li role="separator" className="divider"></li>
          <li><a onClick={this.handleSignOut}>Sign Out</a></li>

        </ul>
      </li>;

      return(
        <div>
          <nav className="navbar navbar-default">
            <div className="container-fluid">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" onClick={this.handleLogoClick}>AnnotateMe</a>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  {dropdown}
                </ul>
                <Search />
              </div>
            </div>
          </nav>
        </div>
      );
    }
  });
}(this));
