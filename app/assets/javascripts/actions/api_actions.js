(function(root) {
  'use strict';
  var ApiActions = root.ApiActions = {
    receiveAllSongs: function(songs){
      var action = {
        actionType: SongConstants.RECEIVED_SONGS,
        songs: songs
      };

      AppDispatcher.dispatch(action);
    },
    receiveSong: function(song){
      var action = {
        actionType: SongConstants.RECEIVED_SONG,
        song: song
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));