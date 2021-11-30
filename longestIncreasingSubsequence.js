/*
  Found the longest increasing subsequence in an array.
  [5,2,6,3,4,9,1,10] should return [2,3,4,9,10]
  from youtube video url : https://www.youtube.com/watch?v=aPQY__2H3tE
*/

/**
 * @description Get the size of the longest subsequence.
 * @returns integer - the longest increasing subsequence.
 */
const lisSize = (sequence) => {
  const table = new Set()
  table.add([])

  let maxLenth = 0

  for (let num of sequence) {
    table.forEach((seq) => {
      const lastNumOfSeq = seq[seq.length - 1]

      if (!lastNumOfSeq) {
        if (maxLenth < 1) maxLenth = 1
        return table.add([num])
      } else if (num > lastNumOfSeq) {
        maxLenth = maxLenth < seq.length + 1 ? seq.length + 1 : maxLenth
        return table.add([...seq, num])
      }
    })
  }

  return maxLenth
}

/**
 * @description Here we are using arrays inside the set,
 * (two arrays with the same content are not equal, so Set don't seem uniq)
 * so if there is two way of creating the same subsequence,
 * the same subsequence will appear twice in the output result.
 * @param {*} sequence
 * @returns the longest increasing subsequence.
 */
const lisArr = (sequence) => {
  const table = new Set()
  table.add([])

  let maxLenth = 0

  for (let num of sequence) {
    table.forEach((seq) => {
      const lastNumOfSeq = seq[seq.length - 1]

      // console.log(lastNumOfSeq)

      if (!lastNumOfSeq) {
        if (maxLenth < 1) maxLenth = 1
        return table.add([num])
      } else if (num > lastNumOfSeq) {
        maxLenth = maxLenth < seq.length + 1 ? seq.length + 1 : maxLenth
        return table.add([...seq, num])
      }
    })
  }

  // console.log(maxLenth)

  const result = [...table.values()].filter((seq) => seq.length === maxLenth)
  return result
}

/**
 * @description Here we are using strings inside the set,
 * so if there is two way of creating the same subsequequence,
 * only one will appear in the output result.
 * @param {*} sequence
 * @returns the longest increasing subsequence.
 */
const lisStr = (sequence) => {
  const table = new Set()
  table.add("")

  let maxLenth = 0

  for (let num of sequence) {
    table.forEach((seqStr) => {
      const seq = seqStr.split(",")
      const lastNumOfSeq = seq[seq.length - 1]

      // console.log(table)

      if (!lastNumOfSeq) {
        if (maxLenth < 1) maxLenth = 1
        return table.add(num.toString())
      } else if (num > +lastNumOfSeq) {
        maxLenth = maxLenth < seq.length + 1 ? seq.length + 1 : maxLenth
        return table.add(seqStr + "," + num)
      }
    })
  }

  // console.log(table)

  const result = [...table.values()].filter((seq) => {
    return seq.split(",").length === maxLenth && seq != ""
  })

  return result
}

const arrTest1 = []
const arrTest2 = [9, 6, 4]
const arrTest3 = [5, 2, 3, -4, 6, -1, 4, 9, 10]
const arrTest4 = [15, 1, 6, 12, 5, 2, 1, 6, 3, 4, 9, 10, 12, 6, 12]

console.log(lisSize(arrTest1))
console.log(lisSize(arrTest2))
console.log(lisSize(arrTest3))
console.log(lisSize(arrTest4))

console.log(lisArr(arrTest1))
console.log(lisArr(arrTest2))
console.log(lisArr(arrTest3))
console.log(lisArr(arrTest4))

console.log(lisStr(arrTest1))
console.log(lisStr(arrTest2))
console.log(lisStr(arrTest3))
// There is no redondancy with lisStr (check function description).
console.log(lisStr(arrTest4))

console.time("perfSize")
const lis0 = lisSize(arrTest4)
console.timeEnd("perfSize")

console.time("perfArr")
const lis1 = lisArr(arrTest4)
console.timeEnd("perfArr")

console.time("perfStr")
const lis2 = lisStr(arrTest4)
console.timeEnd("perfStr")
