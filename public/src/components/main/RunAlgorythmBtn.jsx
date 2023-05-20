import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { shrinkMatrix } from "../../utils/SequenceHandler";

import { motifActions } from "../../store/logic/motifsSlice";

import findMotif, {
  extractMotifsOccurrence,
  fuzzyengine,
} from "../../utils/findMotif";
export default function RunAlgorythmBtn() {
  // const [shrinkedMatrix, setshrinkedMatrix] = useState([]);
  const dispatch = useDispatch();
  const sequenceMatrix = useSelector((state) => state.sequence.sequenceArray);
  const flagsForRevers = useSelector((state) => state.sequence.flagsForRevers);
  const motifExclusionArray = useSelector(
    (state) => state.motif.motifExclusionArray
  );

  useEffect(() => {
    // console.log(sequenceMatrix);
    console.log("run alg runned aggain");
    callAlg(true);
  }, [sequenceMatrix]); // sequenceMatrix ham inja bood
  useEffect(() => {
    // console.log(sequenceMatrix);
    console.log("run alg runned aggain");
    callAlg();
  }, [motifExclusionArray]); // sequenceMatrix ham inja bood

  const getBaseScores = async (motifs) => {
    let { data } = await axios.post("/motifs/basescore", {
      data: motifs,
    });

    let baseScoreArray = data.data;
    return baseScoreArray;
  };

  const calculateScore = (baseScores, motifOccurrence) => {
    let scores = [];
    baseScores.forEach((element) => {
      let motif = element[0];
      let motifBaseScore = element[1];
      let numberOfRepeat = motifOccurrence[motif].length;
      let score = fuzzyengine(motifBaseScore, motif.length, numberOfRepeat);
      scores.push([motif, score]);
    });

    return scores;
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

  const callAlg = async (flag = false) => {
    if (flag) {
      dispatch(motifActions.setMotif([]));
      return;
    }
    submiteAction("RunAlg");
    let sh = shrinkMatrix(sequenceMatrix);

    let foundMotifs = findMotif(sh, motifExclusionArray);

    let OccurrenceOfMotifs = extractMotifsOccurrence(foundMotifs);
    console.log("Occu in runAlg", OccurrenceOfMotifs);
    let baseScoreArray = await getBaseScores(OccurrenceOfMotifs);
    let scoreArray = calculateScore(baseScoreArray, OccurrenceOfMotifs);

    setAlgSequence_andGlobalState(foundMotifs, scoreArray);
  };

  // e.g.
  // let a = [
  //   {
  //     firstRow: 1,
  //     secondRow: 2,
  //     between: "13-16",
  //     motif: "AAA",
  //     score: 15,
  //   },
  // ];
  const setAlgSequence_andGlobalState = (foundMotifs, scoreArray) => {
    let temp = [];
    console.log("foundMotids in runAlg", foundMotifs);
    for (const el of foundMotifs) {
      if (temp.includes(el["motif"])) continue;
      console.log("this is el", el, scoreArray);
      // search for the score
      for (const s of scoreArray) {
        if (s[0] === el["motif"]) {
          temp.push({
            motif: el["motif"],
            firstRow: el["seq1"],
            secondRow: el["seq2"],
            start: el["start"],
            score: s[1],
            isReversed:
              flagsForRevers[el["seq1"]] || flagsForRevers[el["seq2"]],
          });
          break;
        }
      }
    }

    dispatch(motifActions.setMotif(temp));
  };

  return (
    <div>
      <button onClick={() => callAlg()}>Run algorythm</button>
      {/* <button onClick={() => getBaseScores()}>Run server</button> */}
    </div>
  );
}
