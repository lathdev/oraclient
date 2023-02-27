import React from "react";
import S from "./ModalTipPi.module.scss";
import axios from "axios";

function ModalTipPi({ onTipPi }) {
    const [value, setValue] = React.useState("");

    const handleChangeValue = (e) => {
        setValue(e.target.value);
    };

    const handleTipPi = async () => {
        onTipPi(+value ? +value : 1);
    };
    return (
        <div>
            <input
                type={"number"}
                className={S.Input}
                placeholder={"1 Pi"}
                value={value}
                onChange={handleChangeValue}
            />
            <button className={S.Button} onClick={handleTipPi}>
                Tip
            </button>
        </div>
    );
}

export default ModalTipPi;
