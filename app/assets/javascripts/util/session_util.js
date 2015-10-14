(function(root) {
  'use strict';

  var SessionUtil = root.SessionUtil = {
    signOut: function(){
      $.ajax({
        url: "/session",
        type: "delete",
        success: function(){
          window.location = "/";
        }
      });
    }
  };
}(this));
