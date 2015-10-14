(function(root) {
  'use strict';

  var Navbar = root.Navbar = React.createClass({
    handleSignOut: function(e){
      e.preventDefault();
      SessionUtil.signOut();
    },
    render: function(){

      var dropdown = <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li><a href="">Profile</a></li>
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
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                <ul className="nav navbar-nav navbar-right">
                  {dropdown}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  });
}(this));
