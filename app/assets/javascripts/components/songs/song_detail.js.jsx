(function(root) {
  'use strict';

  var SongDetail = root.SongDetail = React.createClass({
    getInitialState: function(){
      return {song: {}};
    },
    componentDidMount: function(){
      SongStore.addChangeListener(this._onChange);
      ApiUtil.fetchSong(parseInt(this.props.params.id));
    },
    componentWillUnmount: function(){
      SongStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState({song: SongStore.getSongById(parseInt(this.props.params.id))});
    },
    render: function(){
      return(
        <div>
          <div>Name: {this.state.song.name}</div>
          <div>Released on {this.state.song.release_date}</div>
          <div>
            Lyrics
            <div>
              <pre>
                {this.state.song.lyrics}
              </pre>
            </div>
          </div>
        </div>
      );
    }
  });
}(this));
