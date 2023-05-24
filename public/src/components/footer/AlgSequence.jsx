import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import { seqToArray, seqGenerator } from "../../utils/SequenceHandler";
import { useDispatch, useSelector } from "react-redux";
import { sequenceAction } from "../../store/logic/sequenceSlice";
import { userActions } from "../../store/logic/userSlice";
import { motifActions } from "../../store/logic/motifsSlice";

//import Icons
import Bad from "./icons/bad.svg";
import Good from "./icons/good.svg";
import NotBad from "./icons/notbad.svg";
import Perfect from "./icons/perfect.svg";

// import { sequenceAction } from "../../store/logic/sequenceSlice";
import axios from "axios";

// import icons
import ConfirmBtn from "./icons/confirm.svg";
import CancelBtn from "./icons/cancel.svg";
import { useCookies } from "react-cookie";
export default function AlgSequence({
  sequence,
  id,
  seq1,
  seq2,
  start,
  score,
  isReversed,
}) {
  const dispatch = useDispatch();
  const [cookie, setCookie] = useCookies([]);
  const flagsForRevers = useSelector((state) => state.sequence.flagsForRevers);

  let sequenceLen = sequence.length;
  const sequenceGenerator = (sequence) => {
    return (
      <>
        {sequence.map((seq) => (
          <span className={seq}></span>
        ))}
      </>
    );
  };
  const onHoverHandler = () => {
    dispatch(
      sequenceAction.sequenceOnHoverEffect({
        seq1,
        seq2,
        start,
        sequenceLen,
      })
    );
  };
  const onHoverExitHandler = () => {
    dispatch(
      sequenceAction.sequenceOnHoverExitEffect({
        seq1,
        seq2,
        start,
        sequenceLen,
        sequence,
      })
    );
  };
  //   const setCurrentIndex = (_id) => {
  //     dispatch(sequenceAction.setCurrentIndex(_id));
  //   };

  const confirmMotif = async () => {
    try {
      let { data } = await axios.post(
        "/motifs/submitscore",
        {
          score,
          sequence,
          isReversed,
        },
        { withCredentials: true }
      );
      if (data.error) toast(data.error);
      else dispatch(userActions.setNewScore(data.score));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = async (action) => {
    dispatch(userActions.isScoreChanged());
    switch (action) {
      case "confirm":
        confirmMotif();

        dispatch(motifActions.excludeMotif(sequence.join("").toString()));

        break;
      case "reject":
        dispatch(motifActions.excludeMotif(sequence.join("").toString()));
        break;

      default:
        break;
    }
  };

  return (
    // onMouseEnter={() => console.log("")}
    <div className="alg-sub">
      <div
        onMouseEnter={() => onHoverHandler()}
        onMouseLeave={() => onHoverExitHandler()}
        className="sequence"
      >
        {parseInt(score) >= 40 ? <img src={Perfect} /> : ""}
        {parseInt(score) >= 30 && parseInt(score) < 40 ? (
          <img src={Good} />
        ) : (
          ""
        )}
        {parseInt(score) >= 20 && parseInt(score) < 30 ? (
          <img src={NotBad} />
        ) : (
          ""
        )}
        {parseInt(score) < 20 ? <img src={Bad} /> : ""}
        {sequenceGenerator(sequence)}
      </div>
      <div className="alg-detail">
        {/* <span style={{ fontSize: "12px" }}>score: {parseInt(score)}</span> */}

        <img
          onClick={() => onClickHandler("confirm")}
          alt="confirm"
          src={ConfirmBtn}
        />
        <img
          onClick={() => onClickHandler("reject")}
          alt="reject"
          src={CancelBtn}
        />
      </div>
      <ToastContainer />
    </div>
  );
}
