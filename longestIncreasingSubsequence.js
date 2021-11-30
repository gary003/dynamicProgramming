/*
  Found the longest increasing subsequence in an array.
  [5,2,6,3,4,9,1,10] should return [2,3,4,9,10]
*/

const lis = (sequence) => {
  const table = [[]]

  let maxLenth = 0

  for (let num of sequence) {
    const newSeq = table.map((seq) => {
      const lastNumOfSeq = seq[seq.length - 1]

      // console.log(lastNumOfSeq)

      if (!lastNumOfSeq) {
        if (maxLenth < 1) maxLenth = 1
        return [num]
      } else if (num > lastNumOfSeq) {
        maxLenth = maxLenth < seq.length + 1 ? seq.length + 1 : maxLenth
        return [...seq, num]
      } else {
        return null
      }
    })

    table.push(...newSeq.filter((x) => !!x))
  }

  // console.log(maxLenth)

  const result = table.filter((seq) => seq.length === maxLenth)

  return result
}

const arrTest = [5, 2, 1, 6, 3, 4, 9, 10]
console.log(lis(arrTest))
