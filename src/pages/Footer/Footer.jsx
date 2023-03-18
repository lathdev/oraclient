import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./footer.scss";
import { useTranslation } from "react-i18next";
const Footer = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    return location.pathname !== "/post/create/" &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/category" &&
        location.pathname !== "/search" &&
        location.pathname !== "/resetpassword" &&
        location.pathname !== "/s92h23hh4ndu8sxcn3dn3bf4yf47cnue3" &&
        location.pathname !== `/tao-tai-khoan` &&
        location.pathname !== `/messages` &&
        location.pathname !== `/post/update/${path}` ? (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__about">
                    <div className="footer__about-logo">
                        <img src="/icons/wideLogo.png" alt="" />
                    </div>
                    <div className="footer__about-menu">
                        <ul className="footer__about-list">
                            <li className="footer__about-item">
                                <Link to="/post/terms-of-use">
                                    <span className="footer__about-text">{t("TERMS_OF_USE")}</span>
                                </Link>
                            </li>

                            <li className="footer__about-item">
                                <Link to="/post/privacy-policy">
                                    <span className="footer__about-text">{t("policy")}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    ) : (
        ""
    );
};

export default Footer;
