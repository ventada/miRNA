import React, { useState, useEffect } from "react";
import axios from "axios";

import Sequence from "./main/Sequence";
import { seqGenerator } from "../utils/SequenceHandler";
import { useDispatch, useSelector } from "react-redux";

// import actions
import { sequenceAction } from "../store/logic/sequenceSlice";
import RunAlgorythmBtn from "./main/RunAlgorythmBtn";
import { motifActions } from "../store/logic/motifsSlice";
import KeyEventHandler from "./KeyEventHandler";
export default function Main() {
  // const [seqArray, setSeqArray] = useState([]);
  // bring in the state
  const currentIndex = useSelector((state) => state.sequence.currentIndex);
  const flagsForRevers = useSelector((state) => state.sequence.flagsForRevers);
  const seqArray = useSelector((state) => state.sequence.sequenceArray);
  const dispatch = useDispatch();

  const restoreUserProgress = async () => {
    try {
      const { data } = await axios.get("/actions/restoreuserprgress", {
        withCredentials: true,
      });
      if (!data.sequenceArray) return false;

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  const getRandomsequence = async () => {
    let response = await restoreUserProgress();
    console.log(response);
    if (!response) {
      const { data } = await axios.get("/sequence/random");

      // return console.log(data.sequence["sequence"]);
      let _seq = seqGenerator(data.sequence);

      // setSeqArray((prevState) => [...prevState, _seq]);
      dispatch(sequenceAction.addSequence(_seq));
      dispatch(sequenceAction.setCurrentIndex(1));
    } else {
      // dispatch(motifActions.setExcludeMotif(response.motifExclusionArray));
      for (const i of response.sequenceArray) {
        let _seq = i;

        dispatch(sequenceAction.addSequence(_seq));
        dispatch(sequenceAction.setCurrentIndex(1));
      }
    }
  };

  // get a random seq from server at the beggining
  useEffect(() => {
    getRandomsequence();

    // console.log("this is flag", flagsForRevers);
    // console.log("this is flag", seqArray);
    // console.log("currentIndex", currentIndex);
  }, []);

  return (
    <main>
      <RunAlgorythmBtn />
      {seqArray.map((seq, index) => (
        <Sequence sequence={seq} key={index} id={index + 1} />
      ))}

      <h1>{currentIndex}</h1>
      {/* <KeyEventHandler /> */}
    </main>
  );
}
