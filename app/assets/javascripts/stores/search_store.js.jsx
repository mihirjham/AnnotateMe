(function(root) {
  'use strict';

  var _results = [];
  var SEARCH_CHANGE = "SEARCH_CHANGE";
  var _resetResults = function(results){
    _results = results.slice();
  };

  var SearchStore = root.SearchStore = $.extend({}, EventEmitter.prototype, {
    all: function(){
      return _results.slice();
    },
    addChangeListener: function(handler){
      this.on(SEARCH_CHANGE, handler);
    },
    removeChangeListener: function(handler){
      this.removeListener(SEARCH_CHANGE, handler);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case SearchConstants.RECEIVED_SEARCHED_SONGS:
          _resetResults(payload.songs);
          SearchStore.emit(SEARCH_CHANGE);
          break;
      }
    })
  });
}(this));
