var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = React.createClass({
  render: function(){
    return(
      <div className="row">
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
        <Route path="songs/:songId" component={SongDetail} />
        <Route path="songs/:songId/annotations/new"
               components={{song:SongDetail, form:AnnotationForm}}/>
        <Route path="songs/:songId/annotations/:annotationId"
               components={{song: SongDetail, annotation: AnnotationDetail}}/>
        <Route path="songs/:id/edit" component={SongForm} />
      </Route>
    </Router>,
    document.getElementById("content"));
};
