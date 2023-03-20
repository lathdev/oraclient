import React from "react";
import S from "./Banner.module.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userState$ } from "../../redux/selectors";
import { useTranslation } from "react-i18next";
function Banner() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const currentUser = useSelector(userState$);

    const handleGetStarted = () => {
        if (currentUser.currentUser) {
            navigate("/post/create/");
        } else {
            navigate("/login");
        }
    };
    return (
        <div className={S.Banner}>
            <div className={S.Container}>
                <div className={S.Top}>
                    <h1 className={S.H1}>{t("Ora | Social Network for Pioneers")}</h1>
                    <p className={S.Para}>{t("Write - Share - Connect - Earn Pi")}</p>
                </div>
                <button className={S.Button} onClick={handleGetStarted}>
                   {t("Start")}
                </button>
            </div>
        </div>
    );
}

export default Banner;
