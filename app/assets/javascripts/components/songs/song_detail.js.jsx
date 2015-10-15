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
    handleAnnotationClick: function(annotation){
      console.log("Annotation: " + annotation.annotation);
    },
    formatText: function(lyrics){
      if(this.state.song.lyrics){
        var formattedText = this.state.song.lyrics.slice().split("");

        for(var i = 0; i < this.state.song.annotations.length; i++){
          var annotation = this.state.song.annotations[i];
          var anchor = <a onClick={this.handleAnnotationClick.bind(null, annotation)} key={annotation.id}>
                        {formattedText.slice(annotation.start_index, annotation.end_index).join("")}
                      </a>;

          formattedText.splice(annotation.start_index,
                              annotation.end_index - annotation.start_index,
                              anchor);
        }

        return formattedText;
      }
    },
    render: function(){
      return(
        <div>
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
