(function(root) {
  'use strict';

  var SongForm = root.SongForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin, ReactRouter.History],
    getInitialState: function(){
      return {name: "", lyrics: "", release_date: "", album_id: ""};
    },
    handleSubmit: function(e){
      e.preventDefault();
      ApiUtil.createSong(this.state);
      this.history.pushState(null, "/");
    },
    render: function(){
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Name:
                <input type="text" valueLink={this.linkState("name")}/>
              </label>
            </div>

            <div>
              <label>
                Release Date:
                <input type="date" valueLink={this.linkState("release_date")}/>
              </label>
            </div>

            <div>
              <label>
                Lyrics:
                <textarea valueLink={this.linkState("lyrics")} />
              </label>
            </div>

            <div>
              <input type="submit" value="Add song"/>
            </div>
          </form>
        </div>
      );
    }
  });
}(this));
