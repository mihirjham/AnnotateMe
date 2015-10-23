(function(root) {
  'use strict';

  var CommentIndexItem = root.CommentIndexItem = React.createClass({
    render: function(){
      var button = <button onClick={this.props.handleDeleteComment.bind(null, this.props.comment.id)}>Delete</button>;
      return(
        <div className="comment-index-item">
          <a>{this.props.comment.email}</a>
          <div>
            <p className="comment">
              {this.props.comment.comment}
            </p>
            {CURRENT_USER === parseInt(this.props.comment.user_id) ? button : "" }
          </div>
        </div>
      );
    }
  });
}(this));
