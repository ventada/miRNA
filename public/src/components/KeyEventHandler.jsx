import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sequenceAction } from "../store/logic/sequenceSlice";
import { seqGenerator } from "../utils/SequenceHandler";
import axios from "axios";

export default function KeyEventHandler() {
  const dispatch = useDispatch();

  const getRandomsequence = async () => {
    const { data } = await axios.get("/sequence/random");
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
  const handleKeysEvent = useCallback((e) => {
    let code = e.code;

    switch (code) {
      case "ArrowDown":
        dispatch(sequenceAction.moveCurrentIndexDown());
        break;
      case "ArrowUp":
        dispatch(sequenceAction.moveCurrentIndexUp());

        break;
      case "ArrowRight":
        submiteAction("right");
        dispatch(sequenceAction.shiftToRightSequence());
        break;
      case "ArrowLeft":
        submiteAction("left");
        dispatch(sequenceAction.shiftToLeftSequence());

        break;
      case "Enter":
        submiteAction("add");
        getRandomsequence();
        break;

      case "KeyW":
        submiteAction("up");
        dispatch(sequenceAction.swapWithUpperRow());

        break;
      case "KeyS":
        submiteAction("down");
        dispatch(sequenceAction.swapWithBottomRow());
        break;
      case "KeyR":
        submiteAction("reverse");
        dispatch(sequenceAction.reverseCurrentSequence());
        break;
      case "Delete":
        submiteAction("Delete");
        dispatch(sequenceAction.deleteCurrentSequence());
        break;

      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeysEvent);
    console.log("from useEffect");
    return () => document.removeEventListener("keydown", handleKeysEvent);
  }, []);
  return <></>;
}
