(function(root) {
  'use strict';

  var Search = root.Search = React.createClass({
    getInitialState: function(){
        return {searchString: "", searchResults: SearchStore.all()};
    },
    handleChange: function(e){
      ApiUtil.fetchSongsByString(e.target.value);
      this.setState({searchString: e.target.value, searchResults: SearchStore.all()});
    },
    render: function(){
      return(
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" placeholder="Search" value={this.state.searchString}/>
          </div>
        </form>
      );
    }
  });
}(this));
