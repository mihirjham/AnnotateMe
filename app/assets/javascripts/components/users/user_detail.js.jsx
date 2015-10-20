(function(root) {
  'use strict';

  var UserDetail = root.UserDetail = React.createClass({
    getInitialState: function(){
      return {user: UserStore.currentUser()};
    },
    componentDidMount: function(){
      UserStore.addChangeListener(this._onChange);
      ApiUtil.fetchUser(this.props.params.id);
    },
    componentWillUnmount: function(){
      UserStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(){
      ApiUtil.fetchUser(this.props.params.id);
    },
    _onChange: function(){
      this.setState({user: UserStore.currentUser()});
    },
    render: function(){
      if(this.state.user === undefined){
        return(<div></div>);
      }

      return(
        <div>
          {this.state.user.email}
          <div>
            <ul>
              {
                this.state.user.annotations.map(function(annotation){
                  return <li key={annotation.id}>{annotation.annotation} on {annotation.song_name}</li>;
                })
              }
            </ul>
          </div>
        </div>
      );
    }
  });

}(this));
