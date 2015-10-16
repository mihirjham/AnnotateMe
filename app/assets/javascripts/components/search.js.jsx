(function(root) {
  'use strict';

  var Search = root.Search = React.createClass({
    mixins: [ReactRouter.History],
    getInitialState: function(){
        return {searchString: "", searchResults: SearchStore.all()};
    },
    componentDidMount: function(){
      SearchStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
      SearchStore.removeChangeListener(this._onChange);
    },
    _onChange: function(){
      this.setState({searchResults: SearchStore.all()});
    },
    handleChange: function(e){
      ApiUtil.fetchSongsByString(e.target.value);
      this.setState({searchString: e.target.value});
    },
    handleClick: function(result){
      this.setState({searchString: ""});
      ApiUtil.fetchSongsByString("");
      this.history.pushState(null, "/songs/"+result.id.toString());
    },
    render: function(){
      return(
        <div className="navbar-form navbar-left" role="search">
          <div className="form-group">
            <input onChange={this.handleChange} type="text" className="form-control" placeholder="Search for songs" value={this.state.searchString}/>
          </div>
          <div>
            <ul>
              {
                this.state.searchResults.map(function(result){
                  return <li key={result.id} onClick={this.handleClick.bind(null, result)}>{result.name}</li>;
                }.bind(this))
              }
            </ul>
          </div>
        </div>
      );
    }
  });
}(this));
