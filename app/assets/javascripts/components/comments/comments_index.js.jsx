(function(root) {
  'use strict';
  var CommentsIndex = root.CommentsIndex = React.createClass({
    render: function(){
      if(this.props.comments === undefined){
        return <div></div>;
      }
      return(
        <div className="comments-container">
          <CommentForm handleCommentCreate={this.props.handleCommentCreate}/>
          {
            this.props.comments.map(function(comment){
              return <CommentIndexItem key={comment.id} comment={comment} handleDeleteComment={this.props.handleDeleteComment}/>;
            }.bind(this))
          }
        </div>
      );
    }
  });
}(this));
