import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

/// Import Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../components/Main";
import { useDispatch } from "react-redux";
import { userActions } from "../store/logic/userSlice";
import { sequenceAction } from "../store/logic/sequenceSlice";
import KeyEventHandler from "../components/KeyEventHandler";

export default function Secret() {
  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) return navigate("login");

      const { data } = await axios.post(
        "/auth",
        {},
        {
          withCredentials: true,
        }
      );
      if (!data) {
        removeCookie("jwt");
        navigate("login");
      } else {
        let username = data.email.split("@")[0];
        toast(`hi ${username}`, { theme: "dark" });
        // restoreUserProgress();
        dispatch(userActions.setUserName(username));
      }
    };
    verifyUser();
  }, [cookie, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/login");
    dispatch(sequenceAction.setSequenceEmpty());
  };
  return (
    <>
      <>
        <Header logout={logout} />
        <Main />
        <Footer />
      </>
      <ToastContainer />
      <KeyEventHandler />
    </>
  );
}
