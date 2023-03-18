import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Reply = ({ reply, visible, currentUser, isAdmin }) => {
    let date = new Date(reply.createdAt);
    const [voteCountReply, setVoteCountReply] = useState(null);
    const [voteCountReplyUpdate, setVoteCountReplyUpdate] = useState([]);
    const [isUserCmt, setIsUserCmt] = useState(false);
    const [activeEdit, setActiveEdit] = useState(false);
    const [edit, setEdit] = useState({});
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
    const handelVisibleEdit = () => {
        setActiveEdit(!activeEdit);
        setEdit(reply)
    }
    const handleEdit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const token = localStorage.getItem("token");
                const option = {
                    method: "put",
                    url: `/api/v1/reply/reply/edit/`,
                    data: {
                        replyId: reply._id, 
                        content: edit.content
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                };
                const res = await axios(option);
                if (res.data.data) window.location.reload(false);
               
            } catch (err) {}
        },
        [edit]
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
                          {isUserCmt ? (
                         <div onClick={handelVisibleEdit} style={{padding:"8px"}}>
                            
                         {t("edit")}
                         
                     </div> )
                        : ("") 
                        }
                        </div>
                    </div>
                </div>
            </div>
            {activeEdit ? (
                <div className="">
                    <div className="reply-comment">
                        <div className="reply-comment-form">
                            <form action="" className="comment__form">
                                <textarea
                                    className="comment__form-data"
                                    value={edit.content}
                                    onChange={(e) => 
                                        setEdit({
                                            ...edit,
                                            content: e.target.value,
                                        })
                                     }
                                ></textarea>
                                <div className="comment__form-actions" onClick={handleEdit}>
                                    <div className="comment__form-actions-submit">{t("send")}</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
        
    );
};

export default Reply;
