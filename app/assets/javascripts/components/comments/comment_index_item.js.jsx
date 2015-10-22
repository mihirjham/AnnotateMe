(function(root) {
  'use strict';

  var CommentIndexItem = root.CommentIndexItem = React.createClass({
    render: function(){
      return(
        <div className="comment-index-item">
          <a>{this.props.comment.email}</a>
          <div>
            <p className="comment">
              {this.props.comment.comment}
            </p>
          </div>
        </div>
      );
    }
  });
}(this));
