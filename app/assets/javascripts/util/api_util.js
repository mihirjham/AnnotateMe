(function(root) {
  'use strict';
  var ApiUtil = root.ApiUtil = {
    fetchAllSongs: function(){
      $.ajax({
        url: "/api/songs",
        type: "get",
        dataType: "json",
        success: function(responseData){
          ApiActions.receiveAllSongs(responseData);
        }
      });
    }
  };
}(this));
