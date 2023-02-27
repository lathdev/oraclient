import React from "react";
import S from "./Banner.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";

function Banner() {
    const navigate = useNavigate();
    const currentUser = useSelector(userState$);

    const handleGetStarted = () => {
        if (currentUser.currentUser) {
            navigate("/post/create");
        } else {
            navigate("/login");
        }
    };
    return (
        <div className={S.Banner}>
            <div className={S.Container}>
                <div className={S.Top}>
                    <h1 className={S.H1}>Piora | Social Network for Pioneer</h1>
                    <p className={S.Para}>Piora is a social network for people who want to share their ideas and ...</p>
                </div>
                <button className={S.Button} onClick={handleGetStarted}>
                    Get Started
                </button>
            </div>
        </div>
    );
}

export default Banner;
