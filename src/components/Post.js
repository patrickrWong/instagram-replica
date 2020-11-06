import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from '../firebase';
import firebase from "firebase";

function Post({ postID, user, username, caption, imageURL }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if(postID) {
            unsubscribe = db
                .collection("posts")
                .doc(postID)
                .collection("comments")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postID]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postID).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    }

    return (
        <div className="post">
            <div className="postHeader">
                <Avatar
                    className="postAvatar"
                    alt={username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>

            <img className="postImg" src={imageURL} alt="Not Found" /> 

            <h4 className="postText"><strong className="user">{username}</strong>{caption}</h4>

            <div className="postComments">
                {comments.map((comment) => (
                    <p className="comment">
                        <b>{comment.username}</b> {comment.text}
                    </p>
                ))}

            </div>


            {user && (
                <form className="commentBox">
                    <input
                        className="postInput"
                        type="text"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="postButton"
                        disabled={!comment}
                        type="submit"
                        onClick={postComment}
                    >
                    Post
                    </button>
                </form>
            )}
          
        </div>
    )
}

export default Post
