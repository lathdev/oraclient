import React, { useLayoutEffect } from "react";
import S from "./Loader.module.css";

const Loader = () => {
    useLayoutEffect(() => {
        window.document.documentElement.scrollTo(0, 0);
        window.document.documentElement.style.overflow = "hidden";

        return () => {
            window.document.documentElement.style.overflow = "unset";
        };
    }, []);

    return (
        <div className={S.ContainerLoader}>
            <div className={S.Loader}></div>;
        </div>
    );
};

export default Loader;
