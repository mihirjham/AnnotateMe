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

var startApp = function(){
  React.render(
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={SongsIndex}/>
        <Route path="songs/new" component={SongForm} />
        <Route path="songs/:id" component={SongDetail} />
        <Route path="songs/:id/edit" component={SongForm} />
      </Route>
    </Router>,
    document.getElementById("content"));
};
