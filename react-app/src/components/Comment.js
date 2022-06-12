import React from "react";

export default class Comment extends React.Component {
    _getUpperCase(name) {
        return name.toUpperCase();
    }
    render() {
        return (
            <div className="comment">
                <blockquote className="blockquote">
                    <p className="mb-0">
                        {this.props.body}
                    </p>
                    <footer className="blockquote-footer">
                        {this.props.author}
                    </footer>
                </blockquote>
                <hr />
                <div className="comment-header">
                    <h3>
                        {this._getUpperCase(this.props.author)}
                    </h3>
                </div>
                <div className="comment-body">
                    <blockquote>
                        {this.props.body}
                    </blockquote>
                </div>
                <div className="comment-footer">
                    <a href="#" className="comment-footer-delete">
                        Delete
                    </a>
                </div>
                <hr />
            </div>
        );
    }
}