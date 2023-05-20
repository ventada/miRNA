const FindMotifs = (matrix, motifExclusionArray) => {
  // console.log(matrix);

  let motifs = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix.length; j++) {
      // let motif = y(matrix[i], matrix[j], i, j);
      // if (motif.length > 0) motifs.push(motif);
      // console.log(matrix[i], matrix[j]);
      searchMotifs(matrix[i], matrix[j], i, j, motifs, motifExclusionArray);
    }
  }

  return motifs;
};

const searchMotifs = (
  seq1,
  seq2,
  indexSeq1,
  indexSeq2,
  motifs,
  motifExclusionArray
) => {
  let lengthOfTheMotif = 0;
  let theMotif = "";
  for (let i = 0; i < seq1.length; i++) {
    if (seq1[i] === seq2[i]) {
      lengthOfTheMotif++;
      theMotif += seq1[i];
    } else {
      if (lengthOfTheMotif > 2 && !motifExclusionArray.includes(theMotif)) {
        motifs.push({
          motif: theMotif,
          start: i - lengthOfTheMotif,
          seq1: indexSeq1,
          seq2: indexSeq2,
        });
      }
      lengthOfTheMotif = 0;
      theMotif = "";
    }
  }
  return;
};

// a is the motif matrix
export const extractMotifsOccurrence = (a) => {
  let temp = {};
  if (a.length == 1) {
    temp[a[0].motif] = [];
    temp[a[0].motif].push(a[0].seq1);
    temp[a[0].motif].push(a[0].seq2);
    return temp;
  }
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (i == j) continue;
      if (!temp[a[i].motif]) temp[a[i].motif] = [];

      if (!temp[a[i].motif].includes(a[i].seq1))
        temp[a[i].motif].push(a[i].seq1);
      if (!temp[a[i].motif].includes(a[i].seq2))
        temp[a[i].motif].push(a[i].seq2);
    }
  }

  return temp;
};

// calulate the score

export function fuzzyengine(scoreitem, lengthitem, countitem) {
  const lowscore = Math.max(
    Math.min(
      parseFloat(Number(triang(scoreitem, 0, 0.15)).toString()),
      1,
      parseFloat(Number(triang(scoreitem, 0.45, 0.3)).toString())
    ),
    0
  );
  const mediumscore = Math.max(
    Math.min(
      parseFloat(Number(triang(scoreitem, 0.3, 0.45)).toString()),
      parseFloat(Number(triang(scoreitem, 0.6, 0.45)).toString())
    ),
    0
  );
  const highscore = Math.max(
    Math.min(
      parseFloat(Number(triang(scoreitem, 0.45, 0.75)).toString()),
      1,
      parseFloat(Number(triang(scoreitem, 1, 0.75)).toString())
    ),
    0
  );
  const lowlength = Math.max(
    Math.min(
      parseFloat(Number(triang(lengthitem, 2, 3)).toString()),
      1,
      parseFloat(Number(triang(lengthitem, 5, 4)).toString())
    ),
    0
  );
  const mediumlength = Math.max(
    Math.min(
      parseFloat(Number(triang(lengthitem, 4, 5)).toString()),
      parseFloat(Number(triang(lengthitem, 6, 5)).toString())
    ),
    0
  );
  const highlength = Math.max(
    Math.min(
      parseFloat(Number(triang(lengthitem, 5, 6)).toString()),
      1,
      parseFloat(Number(triang(lengthitem, 8, 7)).toString())
    ),
    0
  );
  const lowcount = Math.max(
    Math.min(
      parseFloat(Number(triang(countitem, 2, 3)).toString()),
      1,
      parseFloat(Number(triang(countitem, 4, 3)).toString())
    ),
    0
  );
  const mediumcount = Math.max(
    Math.min(
      parseFloat(Number(triang(countitem, 3, 4)).toString()),
      parseFloat(Number(triang(countitem, 6, 5)).toString())
    ),
    0
  );
  const highcount = Math.max(
    Math.min(
      parseFloat(Number(triang(countitem, 5, 6)).toString()),
      1,
      parseFloat(Number(triang(countitem, 11, 7)).toString())
    ),
    0
  );
  const sumitems = parseFloat(
    Number(
      lowscore * scoreitem +
        mediumscore * scoreitem +
        highscore * scoreitem +
        lowlength * lengthitem +
        mediumlength * lengthitem +
        highlength * lengthitem +
        lowcount * countitem +
        mediumcount * countitem +
        highcount * countitem
    ).toString()
  );
  const sum1 = parseFloat(
    Number(
      lowcount +
        lowlength +
        lowscore +
        mediumcount +
        mediumlength +
        mediumscore +
        highcount +
        highlength +
        highscore
    ).toString()
  );
  const resultscore = parseFloat(
    parseFloat(Number((sumitems / sum1) * 10).toString()).toFixed(2)
  );
  return parseInt(resultscore);
}
function triang(x, a, b) {
  let c;
  if (x > a) {
    c = parseFloat(Number((x - a) / (b - a)).toString());
  } else {
    c = parseFloat(Number((a - x) / (a - b)).toString());
  }
  return c;
}

export default FindMotifs;
