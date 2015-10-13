(function(root) {
  'use strict';
  var ApiActions = root.ApiActions = {
    receiveAllSongs: function(songs){
      var action = {
        actionType: SongConstants.RECEIVED_SONGS,
        songs: songs
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
