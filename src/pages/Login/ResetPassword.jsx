import React, { useState, useCallback, useEffect } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pisdk } from "../../components/pisdk/pisdk.tsx";
import { useTranslation } from "react-i18next";
import isPiBrowser from "../../components/isPiBrowser/isPiBrowser";
import { HomeLoader } from "../../components/Loader/Loader";
const ResetPassword = () => {
    const [isUserPi, setisUserPi] = useState();
    const [piAcc, setPiAcc] = useState("");
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState({
        password: "",
        confirmPassword: "",
        oldPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setDataPassword((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateInput(e);
    };
    const piB = isPiBrowser();
    const [dataPassword, setDataPassword] = useState({
        password: "",
        confirmPassword: "",
    });
    const { t } = useTranslation();
    const [disable, setDisable] = useState(true);
    const validateInput = (e) => {
        let { name, value } = e.target;
        setError((prev) => {
            const stateObj = { ...prev, [name]: "" };
            switch (name) {
                case "password":
                    if (dataPassword.confirmPassword && value !== dataPassword.confirmPassword) {
                        stateObj["confirmPassword"] = "Please confirm password again";
                    }  else if (value.length < 9) {
                        stateObj[name] = "At least 9 characters";
                    }
                    break;
                default:
                    setDisable(false);
                    break;
            }
            return stateObj;
        });
    };
    let navigate = useNavigate();
   const AuthPi = useCallback(async (e) => {
    if (!piB) alert("Please use Pi Browser")
       else { try {
            e.preventDefault();
            setIsLoading(true);
            const userPi = await Pisdk();

            if (userPi) {
             setPiAcc(userPi.username);
                const option = {
                    method: "put",
                    url: `/api/v1/auth/resetpassword`,
                    data: { email: `${userPi.username}`,
                    accessToken: userPi.uid
                 },
                };
    
                const response = await axios(option);
          
                if (response.data.status === "OK") {
                    setisUserPi(response.data.data);
                    setVisible(!visible);
                    setIsLoading(false);
                }
            }
        } catch (err) {
         //
        } }
    }, []);

 const onSubmitPassword = useCallback(async (e) => {
        try {
            e.preventDefault();
            const option = {
                method: "put",
                url: `/api/v1/auth/resetpipassword`,
                data: { email: piAcc,
                password: dataPassword.password
             },
            };
const response = await axios(option);
if (response.data.status === "OK") {
     alert("Done!")
}  navigate("/");
        } catch (err) {
           //
        }
    }, [piAcc,dataPassword]);

 useEffect(() => {
        if (dataPassword.password !== "" && dataPassword.confirmPassword !== "") {
            if (error.password === "" && error.confirmPassword === "" &&dataPassword.password===dataPassword.confirmPassword) {
                setDisable(false);
            } else {
                setDisable(true);
            }
        }
    }, [error, dataPassword]);
  

    return (
        <div className="resetpass">
                {isLoading ? <HomeLoader /> : ""}
        <h3 className="settings__password" style={{padding:"30px"}}>{t("Reset Password")}</h3>
      
            {visible ? ( <form className="settings__flex">
                                           
                                                    <div className="settings__flex-item-wfull">
                                                    <h3 className="settings__name" style={{textAlign:"center"}}> {isUserPi}</h3>
                                                        <label className="settings__name">{t("new_password")}</label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            className={`settings__input ${
                                                                error.password ? "wrong" : ""
                                                            }`}
                                                            placeholder=""
                                                            value={dataPassword.password}
                                                            onChange={onInputChange}
                                                            onBlur={validateInput}
                                                        />
                                                        {error.password && (
                                                            <p className="settings__mes">{error.password}</p>
                                                        )}
                                                    </div>
                                                    <div className="settings__flex-item-wfull">
                                                        <label className="settings__name" htmlFor="">
                                                            {t("confirm_new_password")}
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="confirmPassword"
                                                            className={`settings__input ${
                                                                error.confirmPassword ? "wrong" : ""
                                                            }`}
                                                            placeholder=""
                                                            value={dataPassword.confirmPassword}
                                                            onChange={onInputChange}
                                                            onBlur={validateInput}
                                                        />
                                                        {error.confirmPassword && (
                                                            <p className="settings__mes">{error.confirmPassword}</p>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={disable}
                                                        onClick={(e) => onSubmitPassword(e)}
                                                        className={`settings__button ${!disable ? "active" : ""}`}
                                                    >
                                                        {t("confirm")}
                                                    </button>
                                                </form>) : (
        <button
                type="submit"
                onClick={AuthPi}
                className="login__form-button"
            >
                {t("Auth with Pi Browser")}
            </button>) }
       
           
           
        
    </div>
    );
};
export default ResetPassword;
