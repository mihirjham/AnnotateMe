(function(root) {
  'use strict';

  var SongsIndex = root.SongsIndex = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {songs: SongStore.all()};
    },
    componentDidMount: function(){
      SongStore.addChangeListener(this._onChange);
      ApiUtil.fetchAllSongs();
    },
    componentWillUnmount: function(){
      SongStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState({songs: SongStore.all()});
    },
    handleClick: function(song){
      this.history.pushState(null, "/songs/" + song.id.toString());
    },
    render: function(){
      return(
        <div className="navbar navbar-default">
          Songs
          <ul>
            {
              this.state.songs.map(function(song){
                return <li onClick={this.handleClick.bind(null, song)} key={song.id}>{song.name}</li>;
              }.bind(this))
            }
          </ul>
        </div>
      );
    }
  });
}(this));
