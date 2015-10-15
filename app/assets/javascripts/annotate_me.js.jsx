var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    return(
      <div>
        <Navbar />
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
          <Route path="songs/:songId" component={SongDetail}>
            <Route path="annotations/new" component={AnnotationForm}/>
            <Route path="annotations/:annotationId" component={AnnotationDetail}/>
          </Route>
        <Route path="songs/:id/edit" component={SongForm} />
      </Route>
    </Router>,
    document.getElementById("content"));
};
