(function(root) {
  'use strict';

  var CHANGE_EVENT = "CHANGE_EVENT";
  var _songs = [];

  var _resetSongs = function(songs){
    _songs = songs.slice();
  };

  var _addSong = function(song){
    for(var i = 0; i < _songs.length; i++){
      if(_songs[i].id === song.id){
        _songs[i] = song;
        return;
      }
    }
    _songs.push(song);
  };

  var SongStore = root.SongStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _songs.slice();
    },
    addChangeListener: function(handler){
      this.on(CHANGE_EVENT, handler);
    },
    removeChangeListener: function(handler){
      this.removeListener(CHANGE_EVENT, handler);
    },
    getSongById: function(id){
      for(var i = 0; i < _songs.length; i++){
        if(_songs[i].id === id){
          return _songs[i];
        }
      }
    },
    findAnnotation: function(id, annotationId){
      var song = this.getSongById(id);
      if(song){
        for(var i = 0; i < song.annotations.length; i++){
          if(song.annotations[i].id === annotationId){
            return song.annotations[i];
          }
        }
      }
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case SongConstants.RECEIVED_SONGS:
          _resetSongs(payload.songs);
          SongStore.emit(CHANGE_EVENT);
          break;

        case SongConstants.RECEIVED_SONG:
          _addSong(payload.song);
          SongStore.emit(CHANGE_EVENT);
          break;
      }
    })
  });

}(this));
