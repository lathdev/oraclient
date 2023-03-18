import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import PostItem from "../../components/PostItem/PostItem";
import "./myposts.scss";
import axios from "axios";
import { userState$ } from "../../redux/selectors";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const MyPosts = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const userState = useSelector(userState$);
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState(null);
    const tab = searchParams.get("tab");
    const [username, setUserName] = useState(null);
    const [postsSaved, setPostsSaved] = useState(null);
    const getUser = useCallback(async () => {
        const option = {
            method: "get",
            url: `/api/v1/auth/${username}`,
        };
        const response = await axios(option);
        setCurrentUser(response.data.data);
    }, [username]);
    useEffect(() => {
        if (userState.currentUser) {
            setCurrentUser(userState.currentUser);
            setUserName(userState.currentUser.userName)
        }
    }, [userState.currentUser]);

    const getPostsByUser = useCallback(async () => {
        const option = {
            method: "get",
            url: `/api/v1/posts/user/${username}`,
        };
        const response = await axios(option);
        setPosts(response.data.data);
    }, [username]);
    useEffect(() => {
        getUser();
        getPostsByUser();
    }, [getUser, getPostsByUser]);

    const getPostSaved = useCallback(
        async (e) => {
            try {
                const option = {
                    method: "post",
                    url: `/api/v1/posts/saved/post`,
                    data: {
                        postId: userState.currentUser.postSaved,
                    },
                };
                const response = await axios(option);
                setPostsSaved(response.data.post);
            } catch (err) {}
        },
        [userState.currentUser]
    );
    useEffect(() => {
        if (userState.currentUser) {
            getPostSaved();
        }
    }, [getPostSaved, userState.currentUser]);


    return userState.currentUser
        ? currentUser && posts && (
              <div className="main">
                  <div className="myposts">
                      
                      <div className="myposts__profile">
                          <div className="myposts__profile-content">
                              
                              <div className="">
                                
                                  {tab === "savedPosts" ? (
                                      <div className="myposts__profile-posts">
                                          <div className="myposts__profile-posts-top">
                                              <div className="myposts__profile-posts-all-body">
                                                  <div className="myposts__profile-posts-all-content">
                                                      <div className="grid">
                                                          {postsSaved
                                                              ? postsSaved.length > 0
                                                                  ? postsSaved.map((post) => (
                                                                        <PostItem post={post} key={post._id} />
                                                                    ))
                                                                  : "Bạn chưa lưu bài viết nào"
                                                              : ""}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  ) : posts.posts.length !== 0 ? (
                                      <div className="myposts__profile-posts">
                                        
                                          <div className="myposts__profile-posts-top">
                                              <div className="myposts__profile-posts-head">
                                                  <div className="myposts__profile-posts-heading">
                                                      <span>{t("Your Posts")}</span>
                                                  </div>
                                              </div>
                                              <div className="myposts__profile-posts-all-body">
                                                  <div className="myposts__profile-posts-all-content">
                                                      <div className="grid">
                                                          {posts.posts.map((post) => (
                                                              <PostItem post={post} key={post._id} />
                                                          ))}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  ) : (
                                      <p>{t("nothing_here")}</p>
                                  )}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )
        : currentUser && posts && (
             ""
          );
};

export default MyPosts;
