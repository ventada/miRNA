import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { sequenceAction } from "../../store/logic/sequenceSlice";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import { seqGenerator } from "../../utils/SequenceHandler";
import { motifActions } from "../../store/logic/motifsSlice";

function ControllerPart(props) {
  const currentIndex = useSelector((state) => state.sequence.currentIndex);

  const dispatch = useDispatch();

  const getRandomsequence = async () => {
    const { data } = await axios.get("/sequence/random");
    console.log("getrandom", data.sequence);
    let _seq = seqGenerator(data.sequence);
    dispatch(sequenceAction.addSequence(_seq));
  };

  const submiteAction = async (action) => {
    let res = await axios.post(
      "/actions/submitaction",
      {
        action,
      },
      { withCredentials: true }
    );
    console.log(res.data);
  };

  const handleActions = (action) => {
    if (currentIndex == 0 && action != "add")
      return toast("you have not chose a sequence", {
        position: "bottom-right",
      });

    submiteAction(action);

    dispatch(sequenceAction.isSequenceChanged(true));

    switch (action) {
      case "reverse":
        dispatch(sequenceAction.reverseCurrentSequence());

        break;
      case "add":
        getRandomsequence();
        break;
      case "delete":
        dispatch(sequenceAction.deleteCurrentSequence());
        dispatch(motifActions.setExcludeMotifEmpty());

        break;
      case "right":
        dispatch(sequenceAction.shiftToRightSequence());
        break;
      case "left":
        dispatch(sequenceAction.shiftToLeftSequence());
        break;
      case "up":
        dispatch(sequenceAction.swapWithUpperRow());
        break;
      case "down":
        dispatch(sequenceAction.swapWithBottomRow());
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className={props.class}>
        <img
          src={props.src}
          alt="icon"
          data-action={props.action}
          onClick={(e) => handleActions(e.target.getAttribute("data-action"))}
        />
      </div>
      <ToastContainer />
    </>
  );
}

export default ControllerPart;
