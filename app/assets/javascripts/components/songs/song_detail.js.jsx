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

      if (selectedText.toString() !== '') {
        debugger;
      }
    },
    handleAnnotationClick: function(annotation){
      console.log("Annotation: " + annotation.annotation);
    },
    formatText: function(){
        var lyrics = this.state.song.lyrics.split("");

        var annotationIndex = [];
        var annotationCount = 0;
        for(var i = 0; i < this.state.song.annotations.length; i++){
          annotationIndex.push(this.state.song.annotations[i].start_index);
        }

        for(i = 0; i < lyrics.length; i++){
          if(annotationIndex.indexOf(i) !== -1){
            var annotation = this.state.song.annotations[annotationCount];
            var text = this.state.song.lyrics.slice(annotation.start_index, annotation.end_index);
            var $anchor = $("<a></a>");
            $anchor.html(text);
            $anchor.on("click", this.handleAnnotationClick.bind(null, annotation));
            $(".lyrics").append($anchor);
            i = annotation.end_index-1;
            annotationCount++;
            continue;
          }
          else{
            var unannotated = "";
            while(i < lyrics.length && annotationIndex.indexOf(i) === -1){
              unannotated += lyrics[i];
              i++;
            }
            $(".lyrics").append(unannotated);
            i--;
          }
        }
    },

    componentDidUpdate: function () {
      this.formatText();
    },
    render: function(){
      return(
        <div>
          <div>Name: {this.state.song.name}</div>
          <div>Released on {this.state.song.release_date}</div>
          <div>
            Lyrics
            <div onMouseUp={this.handleSelect}>
              <pre className="lyrics">
              </pre>
            </div>
          </div>
          <button onClick={this.handleEdit}>Edit Song</button>
        </div>
      );
    }
  });
}(this));
