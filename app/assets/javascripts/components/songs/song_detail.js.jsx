(function(root) {
  'use strict';

  var SongDetail = root.SongDetail = React.createClass({
    mixins: [ReactRouter.History],
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
    componentWillReceiveProps: function(){
      ApiUtil.fetchSong(parseInt(this.props.params.id));
    },
    _onChange: function(){
      this.setState({song: SongStore.getSongById(parseInt(this.props.params.id))});
    },
    handleEdit: function(){
      this.history.pushState(null, "/songs/" + this.props.params.id + "/edit");
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
          <button onClick={this.handleEdit}>Edit Song</button>
        </div>
      );
    }
  });
}(this));
