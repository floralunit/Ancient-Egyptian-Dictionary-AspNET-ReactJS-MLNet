import React from "react";

export default class CommentForm extends React.Component {
    render() {
        return (
            <form className="comment-form" onSubmit={this._handleSubmit.bind(this)}>
                <label>Join the discussion</label>
                <div className="comment-form-fields">
                    <input
                        placeholder="Name:"
                        ref={input => (this._author = input)}
                    />{" "}
                    <br />
                    <textarea
                        placeholder="Comment:"
                        ref={textarea => (this._body = textarea)}
                    />
                </div>
                <div className="comment-form-actions">
                    <button type="submit">Post Comment</button>
                </div>
            </form>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();

        let author = this._author;
        let body = this._body;

        this.props.addComment(author.value, body.value);
    }
}