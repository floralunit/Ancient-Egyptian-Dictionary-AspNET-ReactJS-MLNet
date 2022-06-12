import React from "react";
import { render } from "react-dom";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

export default class CommentBox extends React.Component {
    constructor() {
        super();

        this.state = {
            showComments: false,
            comments: [
                {
                    id: 1,
                    author: "Jogn Brown",
                    body: "react code is easier than u think"
                },
                {
                    id: 2,
                    author: "Matt Brush",
                    body: "i think react odei is better than angular"
                },
                {
                    id: 3,
                    author: "Matt Brush",
                    body: "i think react odei is better than angular"
                }
            ]
        };
    }
    // Get Comments
    _getComments() {

        return this.state.comments.map(comment => {
            return (
                <Comment
                    author={comment.author}
                    body={comment.body}
                    key={comment.id} />
            );
        });
    }

    _getCommentTitle(commentCount) {
        if (commentCount === 0) {
            return "No comments yet";
        } else if (commentCount === 1) {
            return "1 comment";
        } else {
            return `${commentCount} comments`;
        }
    }

    render() {
        const comments = this._getComments();
        let commentNodes;
        let buttonText = "Show comments";

        if (this.state.showComments) {
            buttonText = "Hide comments";
        }
        if (this.state.showComments) {
            commentNodes = (
                <div className="comment-list">
                    {comments}
                </div>
            );
        }
        return (
            <div className="comment-box container">
                <CommentForm addComment={this._addComment.bind(this)} />
                <h1>
                    Comments &nbsp;
                    <small className="text-muted">
                        {this._getCommentTitle(comments.length)}
                    </small>
                </h1>
                <hr />
                <button onClick={this._handleClick.bind(this)}>
                    {buttonText}
                </button>
                {commentNodes}
            </div>
        );
    }

    _addComment(author, body) {
        const comment = {
            id: this.state.comments.length + 1,
            author,
            body
        };
        this.setState({ comments: this.state.comments.concat([comment]) });
    }

    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }
}