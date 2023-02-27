import React from "react";
import S from "./ModalTipPi.module.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
function ModalTipPi({ onTipPi }) {
    const [value, setValue] = React.useState("");
    const { t } = useTranslation();
    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    const handleTipPi = async () => {
        onTipPi(+value ? +value : 1);
    };
    return (
        <div style={{textAlign:"center"}}>
            <p style={{paddingBottom:"12px"}}>{t("insertpitip")}</p>
            <input
                type={"number"}
                className={S.Input}
                placeholder={"1 Pi"}
                value={value}
                onChange={handleChangeValue}
            />
            <button className={S.Button} onClick={handleTipPi}>
                {t("confirm")}
            </button>
        </div>
    );
}

export default ModalTipPi;
