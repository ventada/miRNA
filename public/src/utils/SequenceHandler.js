export const seqToArray = ({ sequence }) => {
  const len = sequence.length;
  let upMargin = Math.ceil((30 - len) / 2);
  let bottomMargin = Math.floor((30 - len) / 2);
  let seqArray = Array.from(sequence);

  for (let index = 0; index < bottomMargin; index++) {
    seqArray.unshift("T");
  }
  for (let index = 0; index < upMargin; index++) {
    seqArray.push("T");
  }

  return seqArray;
};

export const seqGenerator = (seq) => {
  let seqArray = seqToArray(seq);
  let sequence = [];
  seqArray.map((seq) => {
    let className = "";
    switch (seq) {
      case "T":
        className = "T";
        break;
      case "A":
        className = "A";
        break;
      case "G":
        className = "G";
        break;
      case "C":
        className = "C";
        break;
      case "U":
        className = "U";
        break;

      default:
        break;
    }

    sequence.push(className);
  });

  return sequence;
};

export const shrinkMatrix = (matrix) => {
  let maxT_Left = 0;
  for (let i = 0; i < matrix.length; i++) {
    let tempMax = 0;

    for (const el of matrix[i]) {
      if (el !== "T") break;
      tempMax++;
    }

    maxT_Left = tempMax > maxT_Left ? tempMax : maxT_Left;
  }
  let maxT_Right = 0;
  for (let i = 0; i < matrix.length; i++) {
    let tempMax = 0;

    for (const el of [...matrix[i]].reverse()) {
      if (el !== "T") break;
      tempMax++;
    }

    maxT_Right = tempMax > maxT_Right ? tempMax : maxT_Right;
  }

  return makeShrinkMatrix(maxT_Left, maxT_Right, matrix);
};

export const makeShrinkMatrix = (maxT_Left, maxT_Right, matrix) => {
  let shrinkedMatrix = [];

  matrix.forEach((element) => {
    shrinkedMatrix.push(element.slice(maxT_Left, 30 - maxT_Right));
  });

  return shrinkedMatrix;
};

export const shrinkMatrix_Boundery = (matrix) => {
  let maxT_Left = 0;
  for (let i = 0; i < matrix.length; i++) {
    let tempMax = 0;

    for (const el of matrix[i]) {
      if (el !== "T") break;
      tempMax++;
    }

    maxT_Left = tempMax > maxT_Left ? tempMax : maxT_Left;
  }
  let maxT_Right = 0;
  for (let i = 0; i < matrix.length; i++) {
    let tempMax = 0;

    for (const el of [...matrix[i]].reverse()) {
      if (el !== "T") break;
      tempMax++;
    }

    maxT_Right = tempMax > maxT_Right ? tempMax : maxT_Right;
  }

  return { maxT_Left, maxT_Right };
};
