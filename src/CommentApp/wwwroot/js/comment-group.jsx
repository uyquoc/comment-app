import React, { Component } from 'react';
import CommentLine from './comment-line.jsx';

export default class CommentGroup extends Component {
    render() {

        //Initialize 
        let comments = this.props.comments || [];
        let parentId = this.props.parentId;        
        let groupCls = "comment-group";
        let buttonText = "Post";
        let buttonCls = "comment-submit btn btn-info";
        this.callHandlePost = this.callHandlePost.bind(this);

        //In case reply, we need to change some UI style/text 
        if(parentId) {
            groupCls += " comment-replies";
            buttonText = "Reply";
            buttonCls = "comment-submit btn btn-warning";
        }

        //Render list of comments and reply textbox + submit buttion
        return (            
            <div className={groupCls}>
                <div className="comment-lines">
                    {comments.map((comment, index) => 
                        <CommentLine key = {index} comment = {comment} callHandlePost = {this.callHandlePost} />)}
                </div>
                <div className="comment-post">
                    <textarea ref="commentText" className="comment-text"></textarea>
                    <input className={buttonCls} type="button" value={buttonText} onClick={this.callHandlePost} />
                </div>
            </div>
        );
        
    }

    callHandlePost(comment, parentId) {        

        //Get values to pass as parameters of post hanlder
        comment = typeof(comment) === 'string' ? comment : this.refs.commentText.value;
        parentId = typeof(parentId) === 'string' ? parentId : this.props.parentId;

        //Revoke post hanndler
        let handlePost = this.props.handlePost;
        if(handlePost) {
            handlePost(comment, parentId);

            //reset textbox value
            this.refs.commentText.value = "";
        }

    }
}