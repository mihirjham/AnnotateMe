var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
});

$(document).ready(function(){
  React.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={SongsIndex}/>
        <Route path="songs/new" component={SongForm} />
        <Route path="songs/:id" component={SongDetail} />
      </Route>
    </Router>,
    document.getElementById("content"));
});
