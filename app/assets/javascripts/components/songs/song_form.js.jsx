(function(root) {
  'use strict';

  var SongForm = root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function(){
      return {name: "",
              lyrics: "",
              release_date: "",
              album_id: "",
              artist_name: "",
              artist_id: "",
              song_url: "",
              artistResults: ArtistStore.all()};
    },
    componentDidMount: function(){
      ArtistStore.addChangeListener(this._onChange);
      if(this.props.params.id){
        ApiUtil.fetchSong(parseInt(this.props.params.id));
        var song = SongStore.getSongById(parseInt(this.props.params.id));
        this.setState({name: song.name,
                      lyrics: song.lyrics,
                      release_date: song.release_date,
                      album_id: song.album_id,
                      artist_id: song.artist_id,
                      artist_name: song.artist_name,
                      song_url: song.song_url
                    });
      }
    },
    componentWillUnmount: function(){
      ArtistStore.removeChangeListener(this._onChange);
    },
    handleSubmit: function(e){
      e.preventDefault();
      if(this.props.params.id){
        var changes = {
          name: this.state.name,
          release_date: this.state.release_date,
          lyrics: this.state.lyrics,
          album_id: this.state.album_id,
          song_url: this.state.song_url
        };

        ApiUtil.editSong(parseInt(this.props.params.id), changes, this.state.artist_name);
      }
      else{
        var newSong = {
          name: this.state.name,
          release_date: this.state.release_date,
          lyrics: this.state.lyrics,
          album_id: this.state.album_id,
          song_url: this.state.song_url
        };

        ApiUtil.createSong(newSong, this.state.artist_name);
      }
      this.history.pushState(null, "/");
    },
    _onChange: function(){
      this.setState({artistResults: ArtistStore.all()});
    },
    handleArtistSearch: function(e){
      ApiUtil.fetchArtistsByName(e.target.value);
      this.setState({artist_name: e.target.value});
    },
    handleClick: function(e){
      this.setState({artist_name: e.target.textContent});
    },
    render: function(){
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Name:
                <input type="text" valueLink={this.linkState("name")}/>
              </label>
            </div>

            <div>
              <label>Artist</label>
              <input type="text" onChange={this.handleArtistSearch} value={this.state.artist_name}/>
              <div>
                <ul>
                  {
                    this.state.artistResults.map(function(artist){
                      return <li key={artist.id} onClick={this.handleClick}>{artist.name}</li>;
                    }.bind(this))
                  }
                </ul>
              </div>
            </div>

            <div>
              <label>
                Release Date:
                <input type="date" valueLink={this.linkState("release_date")}/>
              </label>
            </div>

            <div>
              <label>
                Song URL(Youtube/SoundCloud):
                <input type="text" valueLink={this.linkState("song_url")}/>
              </label>
            </div>

            <div>
              <label>Lyrics: </label>
              <div>
                <textarea rows="20" cols="100" valueLink={this.linkState("lyrics")} />
              </div>
            </div>

            <div>
              <input type="submit" value={this.props.params.id ? "Edit song" : "Add song"}/>
            </div>
          </form>
        </div>
      );
    }
  });
}(this));
