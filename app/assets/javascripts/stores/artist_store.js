(function(root) {
  'use strict';

  var _artists = [];
  var ARTIST_CHANGE = "ARTIST_CHANGE";

  var _resetArtists = function(artists){
    _artists = artists.slice();
  };

  var ArtistStore = root.ArtistStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _artists.slice();
    },
    addChangeListener: function(handler){
      this.on(ARTIST_CHANGE, handler);
    },
    removeChangeListener: function(handler){
      this.removeListener(ARTIST_CHANGE, handler);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case ArtistConstants.RECEIVED_ARTISTS:
          _resetArtists(payload.artists);
          ArtistStore.emit(ARTIST_CHANGE);
          break;
      }
    })
  });
}(this));
