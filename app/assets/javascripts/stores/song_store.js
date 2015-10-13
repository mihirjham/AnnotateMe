(function(root) {
  'use strict';

  var _songs = [];

  var _resetSongs = function(songs){
    _songs = songs.slice();
  };

  var SongStore = root.SongStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _songs.slice();
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case SongConstants.RECEIVED_SONGS:
          _resetSongs(payload.songs);
          break;
      }
    })
  });
}(this));
