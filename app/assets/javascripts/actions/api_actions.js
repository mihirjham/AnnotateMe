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
    },

    receiveSearchedSongs: function(songs){
      var action = {
        actionType: SearchConstants.RECEIVED_SEARCHED_SONGS,
        songs: songs
      };

      AppDispatcher.dispatch(action);
    },

    receiveAnnotation: function(song){
      var action = {
        actionType: SongConstants.RECEIVED_SONG,
        song: song
      };

      AppDispatcher.dispatch(action);
    },
    receiveArtists: function(artists){
      var action = {
        actionType: ArtistConstants.RECEIVED_ARTISTS,
        artists: artists
      };

      AppDispatcher.dispatch(action);
    },
    receiveUser: function(user){
      var action = {
        actionType: UserConstants.RECEIVED_USER,
        user: user
      };

      AppDispatcher.dispatch(action);
    }
  };
}(this));
