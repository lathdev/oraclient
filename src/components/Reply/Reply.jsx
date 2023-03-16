import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Reply = ({ reply, visible, currentUser, isAdmin }) => {
    let date = new Date(reply.createdAt);
    const [voteCountReply, setVoteCountReply] = useState(null);
    const [voteCountReplyUpdate, setVoteCountReplyUpdate] = useState([]);
    const [isUserCmt, setIsUserCmt] = useState(false);
    const { t } = useTranslation();
    useEffect(() => {
        if (reply.voteCount) {
            setVoteCountReply(reply.voteCount.length);
        }
    }, [reply.voteCount]);
    const handleVoteReply = useCallback(async (id) => {
        const token = localStorage.getItem("token");
        const option = {
            method: "post",
            url: `/api/v1/reply/reply/vote/`,
            data: {
                replyId: id,
            },
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        const res = await axios(option);
        setVoteCountReplyUpdate(res.data.data.voteCount);
    }, []);
    const handleDelete = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const token = localStorage.getItem("token");              
                const option = {
                    method: "post",
                    url: `/api/v1/reply/reply/delete/`,
                    data: {
                        replyId: reply._id,                     
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                };
                const res = await axios(option);
              if (res) window.location.reload(false);
               
            } catch (err) {}
        },
        [reply._id]
    );
    useEffect(() => {
        if (voteCountReplyUpdate) {
            setVoteCountReply(voteCountReplyUpdate.length);
        }
    }, [voteCountReplyUpdate]);
    useEffect(() => {
        if (currentUser.currentUser) {
       
            if (reply.author._id === currentUser.currentUser._id) {
                setIsUserCmt(true);
            }
        }
    }, [reply, currentUser]);
    return (
        <div className="comment-node">
            <div className="comment__child-avt">
                <Link to={`/user/${reply.author.userName}`}>
                    <img
                        src={reply.author.avatar ? `https://${reply.author.avatar.slice(7)}` : "/icons/avatar.png"}
                        alt=""
                    />
                </Link>
            </div>
            <div className="comment__child-body">
                <div className="creator-info">
                    <Link to={`/user/${reply.author.userName}`}>
                        <span className="name-main">
                            {reply.author.displayName ? reply.author.displayName : reply.author.userName}
                        </span>
                    </Link>
                    <div className="metadata">
                        <span className="date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</span>
                    </div>
                    <div className="comment__child-content">{reply.content}</div>
                    <div className="comment__child-actions">
                        <div className="vote">
                            <div className="upvote" onClick={() => handleVoteReply(reply._id)}>
                                <div className="vote-icon">
                                    <i className="bx bxs-up-arrow"></i>
                                </div>
                            </div>
                            <div>
                          
                            </div>
                            <span className="value">{voteCountReply ? voteCountReply : reply.voteCount.length}</span>
                            { isAdmin||isUserCmt ? (
                           <div> <Link to={`/`}
                           onClick={handleDelete}
                          >
                        {t("delete")}
                  </Link></div>
                        ) : (
                            ""
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reply;
