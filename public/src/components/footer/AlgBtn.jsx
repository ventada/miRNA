import React from "react";

export default function AlgBtn({ src, style, action }) {
  const onClickHandler = (action) => {
    switch (action) {
      case "value":
        break;

      default:
        break;
    }
  };
  return (
    <>
      <img
        src={src}
        alt="alg icon"
        style={style}
        onClick={() => onClickHandler(action)}
      />
    </>
  );
}
