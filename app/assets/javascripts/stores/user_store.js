(function(root) {
  'use strict';


  var _currentUser = undefined;
  var USER_CHANGE = "USER_CHANGE";

  var _setUser = function(user){
    _currentUser = user;
  };

  var UserStore = root.UserStore = $.extend({}, EventEmitter.prototype, {
    currentUser: function(){
      return _currentUser;
    },
    addChangeListener: function(handler){
      this.on(USER_CHANGE, handler);
    },
    removeChangeListener: function(handler){
      this.removeListener(USER_CHANGE, handler);
    },
    dispatcherID: AppDispatcher.register(function(payload){
      switch(payload.actionType){
        case UserConstants.RECEIVED_USER:
          _setUser(payload.user);
          UserStore.emit(USER_CHANGE);
          break;
      }
    })
  });
}(this));
