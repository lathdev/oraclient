import { useState, useCallback, useEffect, useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import { userState$ } from "../../redux/selectors";
import { Pisdk } from "../../components/pisdk/pisdk.tsx";
import { useTranslation } from "react-i18next";
import { HomeLoader } from "../Loader/Loader";
const AutoLogin = () => {
    const [errMessage, setErrMessage] = useState(null);
    const loginSuccess = useSelector(userState$);
    const { t } = useTranslation();

    let navigate = useNavigate();
    const dispatch = useDispatch();


 const piLogin = useCallback(async () => {
        try {
            const userPi = await Pisdk();
           if (userPi) {
                dispatch(actions.login.loginPiRequest({ piUser: userPi.user.username, accessToken: userPi.accessToken }));
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
             
        </div>
  )
};
export default AutoLogin;