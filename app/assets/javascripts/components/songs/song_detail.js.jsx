(function(root) {
  'use strict';

  var SongDetail = root.SongDetail = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
      return {song: {annotations: [{start: 0, end: 5}]}};
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
    handleSelect: function(e){
      var userSelection;
      if (window.getSelection) {
          userSelection = window.getSelection();
      }
      else if (document.selection) {
        userSelection = document.selection.createRange();
      }

      var selectedText = userSelection;
      if (userSelection.text) {
        selectedText = userSelection.text;
      }

      if (selectedText !== '') {
      }
    },
    formatText: function(lyrics){
      if(this.state.song.lyrics){
        var formattedText = this.state.song.lyrics.slice().split("");
        
        for(var i = 0; i < this.state.song.annotations.length; i++){
          var anchor = <a>{formattedText.slice(this.state.song.annotations[i].start, this.state.song.annotations[i].end).join("")}</a>;
          formattedText.splice(this.state.song.annotations[i].start,
                              this.state.song.annotations[i].end - this.state.song.annotations[i].start,
                              anchor);
        }

        return formattedText;
      }
    },
    render: function(){
      return(
        <div>
          {<a>link</a>}
          <div>Name: {this.state.song.name}</div>
          <div>Released on {this.state.song.release_date}</div>
          <div>
            Lyrics
            <div onMouseUp={this.handleSelect} className="lyrics">
              <pre>
                {this.formatText()}
              </pre>
            </div>
          </div>
          <button onClick={this.handleEdit}>Edit Song</button>
        </div>
      );
    }
  });
}(this));
