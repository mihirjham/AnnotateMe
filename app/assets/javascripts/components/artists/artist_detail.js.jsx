(function(root) {
  'use strict';

  var ArtistDetail = root.ArtistDetail = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {artist: ArtistStore.all()[0]};
    },
    componentDidMount: function(){
      ArtistStore.addChangeListener(this._onChange);
      ApiUtil.fetchArist(this.props.params.id);
    },
    componentWillUnmount: function(){
      ArtistStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState({artist: ArtistStore.all()[0]});
    },
    handleClick: function(song){
      this.history.pushState(null, "/songs/" + song.id.toString());
    },
    render: function(){

      if(this.state.artist === undefined){
        return <div></div>;
      }
      return(
        <div>
          <div><h1>{this.state.artist.name}</h1></div>
          <div className="song_column">
            Songs
            <ul className="song_list">
              {
                this.state.artist.songs.map(function(song){
                  return <li key={song.id}><a onClick={this.handleClick.bind(null, song)}>{song.name}</a></li>;
                }.bind(this))
              }
            </ul>
          </div>
        </div>
      );
    }
  });
}(this));
