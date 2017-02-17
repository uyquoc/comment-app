import React, {Component} from 'react';
import CommentGroup from './comment-group.jsx';

export default class CommentLine extends Component {
    render () {

        //get value from props
        let comment = this.props.comment || {};
        let callHandlePost = this.props.callHandlePost;

        //Render the comment text and list of replies
        return (
                    <div className="comment-line">
                        <div><label className="from">{comment.from}</label><label className="created">Posted at: {comment.created}</label></div>
                        <div className="message">{comment.message}</div>
                        {comment.replies && <CommentGroup comments = {comment.replies} parentId={comment.id} handlePost = {callHandlePost}/>}
                    </div>
        );
    }
}