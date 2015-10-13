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
    handleItemClick: function(song){
      this.history.pushState(null, "/songs/" + song.id.toString());
    },
    handleButtonClick: function(){
      this.history.pushState(null, "/songs/new");
    },
    render: function(){
      return(
        <div className="navbar navbar-default">
          Songs
          <ul>
            {
              this.state.songs.map(function(song){
                return <li onClick={this.handleItemClick.bind(null, song)} key={song.id}>{song.name}</li>;
              }.bind(this))
            }
          </ul>
          <button onClick={this.handleButtonClick}>Add Song</button>
        </div>
      );
    }
  });
}(this));
