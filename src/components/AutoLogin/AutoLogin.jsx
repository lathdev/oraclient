import { useState, useCallback, useEffect, useLayoutEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import { Pisdk } from "../../components/pisdk/pisdk.tsx";
import { useTranslation } from "react-i18next";
import isPiBrowser from "../../components/isPiBrowser/isPiBrowser";
import { HomeLoader } from "../Loader/Loader";
import { center } from "@cloudinary/url-gen/qualifiers/textAlignment";
const AutoLogin = () => {
    const [errMessage, setErrMessage] = useState(null);
    const piB = isPiBrowser();
    const loginSuccess = useSelector(userState$);
    const { t } = useTranslation();

    let navigate = useNavigate();
    const dispatch = useDispatch();


 const piLogin = useCallback(async () => {
        try {
            const userPi = await Pisdk();
           if (userPi) {
                dispatch(actions.login.loginPiRequest({ piUser: userPi.username, accessToken: userPi.uid }));
            }
        } catch (err) {
            dispatch(actions.login.loginFailure());
        }
    }, []);
    useEffect(() => {
      piLogin()
    }, [piLogin]);
    useEffect(() => {
        if (!loginSuccess.isLoggedIn) {
            setErrMessage(loginSuccess.err);
        }
    }, [loginSuccess]);
    useEffect(() => {
        if (loginSuccess.token) {
            localStorage.setItem("token", loginSuccess.token);
        } else {
            localStorage.removeItem("token");
        }
    }, [loginSuccess]);
    useEffect(() => { 
      
        if (loginSuccess.currentUser) {
            window.location.href = "/";
        }
    }, [navigate, loginSuccess]);
  
    return (
        <div style={{paddingTop:"39px", textAlign:"center"}}>
              <HomeLoader/>
              <p>...</p>
        </div>
  )
};
export default AutoLogin;