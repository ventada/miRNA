import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
export default function Header({ logout }) {
  let sequenceArray = useSelector((state) => state.sequence.sequenceArray);
  let motifExclusionArray = useSelector(
    (state) => state.motif.motifExclusionArray
  );
  const saveUserPrgress = async () => {
    try {
      const { data } = await axios.post(
        "/actions/saveuserprgress",
        {
          sequenceArray,
          motifExclusionArray,
        },
        {
          withCredentials: true,
        }
      );
      if (data.error) toast("somthing went wrong");
      else console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {}, [sequenceArray]);
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <button
        id="headerLogout"
        onClick={() => {
          logout();
        }}
      >
        LogOut
      </button>
      <button
        id=""
        onClick={() => {
          saveUserPrgress();
        }}
      >
        Save Progress
      </button>
      <ToastContainer />
    </header>
  );
}
