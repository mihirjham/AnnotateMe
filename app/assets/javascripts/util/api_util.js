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

    createSong: function(song, artist_name){
        $.ajax({
          url: "/api/songs",
          type: "post",
          dataType: "json",
          data: {song: song, artist_name: artist_name},
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

    editSong: function(id, changes, artist_name){
      $.ajax({
        url: "/api/songs/" + id.toString(),
        type: "patch",
        dataType: "json",
        data: {song: changes, artist_name: artist_name},
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
    },

    createAnnotation: function(id, annotation){
      $.ajax({
        url: "/api/songs/" + id.toString() + "/annotations",
        type: "post",
        dataType: "json",
        data: {annotation: annotation},
        success: function(responseData){
          ApiActions.receiveAnnotation(responseData);
        }
      });
    },

    editAnnotation: function(id, changes){
      $.ajax({
        url: "/api/annotations/" + id.toString(),
        type: "patch",
        dataType: "json",
        data: {annotation: changes},
        success: function(responseData){
          ApiActions.receiveAnnotation(responseData);
        }
      });
    },

    deleteAnnotation: function(id){
      $.ajax({
        url: "/api/annotations/" + id.toString(),
        type: "delete",
        success: function(responseData){
          ApiActions.receiveSong(responseData);
        }
      });
    },

    fetchArist: function(id){
      $.ajax({
        url: "/api/artists/" + id.toString(),
        type: "get",
        dataType: "json",
        success: function(responseData){
          ApiActions.receiveArtists([responseData]);
        }
      });
    },

    fetchArtistsByName: function(name){
      if(name !== ""){
        return $.ajax({
          url: "/api/artists",
          type: "get",
          dataType: "json",
          data: {name: name},
          success: function(responseData){
            ApiActions.receiveArtists(responseData);
          }
        });
      }
      else{
        ApiActions.receiveArtists([]);
      }
    },

    createArtist: function(artist){
      $.ajax({
        url: "/api/artists",
        type: "post",
        dataType: "json",
        data: {artist: artist},
        success: function(responseData){
          ApiActions.receiveArtists([responseData]);
        }
      });
    },

    editArtist: function(id, artist){
      $.ajax({
        url: "/api/artists/" + id.toString(),
        type: "patch",
        dataType: "json",
        data: {artist: artist},
        success: function(responseData){
          ApiActions.receiveArtists([responseData]);
        }
      });
    },

    fetchUser: function(id){
      $.ajax({
        url: "/api/users/" + id.toString(),
        type: "get",
        dataType: "json",
        success: function(responseData){
          ApiActions.receiveUser(responseData);
        }
      });
    },

    editUser: function(id, changes){
      $.ajax({
        url: "/api/users/" + id.toString(),
        type: "patch",
        dataType: "json",
        data: {user: changes},
        success: function(responseData){
          ApiActions.receiveUser(responseData);
        }
      });
    },

    createComment: function(id, comment){
      $.ajax({
        url: "/api/songs/" + id.toString() + "/comments",
        type: "post",
        dataType: "json",
        data: {comment: comment},
        success: function(responseData){
          ApiActions.receiveSong(responseData);
        }
      });
    },

    deleteComment: function(id){
      $.ajax({
        url: "/api/comments/" + id.toString(),
        type: "delete",
        dataType: "json",
        success: function(responseData){
          ApiActions.receiveSong(responseData);
        }
      });
    }
  };
}(this));
