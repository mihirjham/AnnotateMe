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
        <div className="song_column">
          <ul className="song_list">
            {
              this.state.songs.map(function(song){
                return <li key={song.id}>
                    <a onClick={this.handleItemClick.bind(null, song)} >{song.name} by {song.artist_name}</a>
                  </li>;
              }.bind(this))
            }
          </ul>
          <button onClick={this.handleButtonClick}>Add Song</button>
        </div>
      );
    }
  });
}(this));
