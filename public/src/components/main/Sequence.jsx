import React, { useEffect, useState } from "react";
// import { seqToArray, seqGenerator } from "../../utils/SequenceHandler";
import { useDispatch, useSelector } from "react-redux";
import { sequenceAction } from "../../store/logic/sequenceSlice";

export default function Sequence({ sequence, id }) {
  const currentIndex = useSelector((state) => state.sequence.currentIndex);
  const flagsForRevers = useSelector((state) => state.sequence.flagsForRevers);
  const dispatch = useDispatch();

  const sequenceGenerator = (sequence) => {
    return (
      <>
        {sequence.map((seq) => (
          <span className={seq}>{seq}</span>
        ))}
      </>
    );
  };

  const setCurrentIndex = (_id) => {
    dispatch(sequenceAction.setCurrentIndex(_id));
  };

  return (
    <div
      onClick={() => setCurrentIndex(id)}
      className={currentIndex == id ? "sequence selected" : "sequence"}
    >
      {sequenceGenerator(sequence)}
    </div>
  );
}
