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
    },

    createSong: function(song){
      $.ajax({
        url: "/api/songs",
        type: "post",
        dataType: "json",
        data: {song: song},
        success: function(responseData){
          ApiActions.receiveSong(responseData);
        }
      });
    },

    fetchSong: function(id){
      $.ajax({
        url: "/api/songs/" + id.toString(),
        type: "get",
        dataType: "json",
        success: function(responseData){
          ApiActions.receiveSong(responseData);
        }
      });
    },

    editSong: function(id, changes){
      $.ajax({
        url: "/api/songs/" + id.toString(),
        type: "patch",
        dataType: "json",
        data: {song: changes},
        success: function(responseData){
          ApiActions.receiveSong(responseData);
        }
      });
    },

    fetchSongsByString: function(str){
      if(str !== ""){
        $.ajax({
          url: "api/songs",
          type: "get",
          dataType: "json",
          data: {search: str},
          success: function(responseData){
            ApiActions.receiveSearchedSongs(responseData);
          }
        });
      }
      else{
        ApiActions.receiveSearchedSongs([]);
      }
    }
  };
}(this));
