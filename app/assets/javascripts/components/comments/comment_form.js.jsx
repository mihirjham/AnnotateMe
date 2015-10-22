(function(root) {
  'use strict';

  var CommentForm = root.CommentForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    getInitialState: function(){
      return {comment: ""};
    },
    handleSubmit: function(comment, e){
      this.props.handleCommentCreate.apply(null, [comment, e]);
      this.setState({comment: ""});
    },
    render: function(){
      return(
        <form onSubmit={this.handleSubmit.bind(null, this.state.comment)}>
          <div>
            <textarea className="comment-form"
                      valueLink={this.linkState("comment")}
            />
          </div>
          <input type="submit" value="Post comment"/>
        </form>
      );
    }
  });
}(this));
