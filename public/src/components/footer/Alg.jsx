import React, { useEffect, useState } from "react";
import AlgSequence from "./AlgSequence";
import { useDispatch, useSelector } from "react-redux";
import { motifActions } from "../../store/logic/motifsSlice";

export default function Alg() {
  const [sequences, setSequences] = useState([]);
  const [sortedMotif, setsortedMotif] = useState([]);

  // this is motif with scores
  const motifs = useSelector((state) => state.motif.motif);

  const dispatch = useDispatch();

  const findMax = (mot) => {
    console.log("this is not sorted", mot);

    if (!mot[0]) return;
    mot.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;

      return 0;
    });
    console.log("this is sorted", mot);

    setsortedMotif(mot);
    extractSequence(mot);
  };

  const extractSequence = (mot) => {
    let temp = [];
    for (const el of mot) {
      let seq = el["motif"];
      temp.push({
        sequence: Array.from(seq),
        firstRow: el["firstRow"],
        secondRow: el["secondRow"],
        start: el["start"],
        score: el["score"],
        isReversed: el["isReversed"],
      });
    }

    console.log("this is from temp", temp);
    setSequences(temp);
  };

  useEffect(() => {
    console.log("this is motifs", motifs);
    if (motifs.length === 0) {
      setSequences([]);
      return;
    }
    findMax([...motifs]);
  }, [motifs]);
  return (
    <div className="alg ">
      {sequences.slice(0, 3).map((seq, index) => (
        <AlgSequence
          sequence={seq["sequence"]}
          key={index}
          id={index + 1}
          seq1={seq["firstRow"]}
          seq2={seq["secondRow"]}
          start={seq["start"]}
          score={seq["score"]}
          isReversed={seq["isReversed"]}
        />
      ))}
    </div>
  );
}
