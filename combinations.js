const combinationsTree = (cards, hand = [], allHands = [], shift = false) => {
  if (cards.length == 0) return null

  const [card, ...rest] = cards

  if (shift) allHands.push(hand)

  if (hand.filter((x) => x == card).length < cards.filter((x) => x == card).length) combinationsTree(cards, hand.concat([card]), allHands, true)

  combinationsTree(rest, hand, allHands, false)

  return allHands
}

const combinationsTreeDP = (cards) => {
  if (cards.length == 0) return [""]
  const [card, ...rest] = cards

  const allcombsWithoutCard = combinationsTreeDP(rest)
  const allCombsWithCard = []

  for (let c of allcombsWithoutCard) {
    allCombsWithCard.push([card, ...c].join(""))
  }

  return [...allCombsWithCard, ...allcombsWithoutCard]
}

const combinationsTab = (arr) => {
  const table = Array(arr.length + 1).fill(null)
  table[0] = [""]

  for (let i = 0; i < arr.length; i += 1) {
    table[i + 1] = table[i].map((val) => val + arr[i]).concat(table[i])
  }

  return table[arr.length]
}

const combinationsTab2 = (arr) => {
  return [[""]].concat(Array(arr.length - 1).fill(null)).reduce(
    (acc, val, i) => {
      return acc.concat([acc[i].map((currAcc) => currAcc + arr[i]).concat(acc[i])])
    },
    [[""]]
  )[arr.length]
}

const combinationsRedableHO = (arr) => {
  const table = Array(arr.length).fill(null)
  table[0] = [""]

  const resultTable = table.reduce(
    (acc, val, i) => {
      const newCombi = acc[i].map((currAcc) => currAcc + arr[i])
      const oldCombi = acc[i]
      const nextSetOfCombi = newCombi.concat(oldCombi)
      return acc.concat([nextSetOfCombi])
    },
    [[""]]
  )
  return resultTable[arr.length]
}

const combinationsPush = (arr) => {
  let result = [""]

  for (let letter of arr) {
    result = result.concat(result.map((val) => val.concat(letter)))
  }

  return result
}

const testArray = "ABCDEFGHI".split("")

console.time("combinationsTree")
const comb1 = combinationsTree(testArray)
// console.log(comb1)
console.timeEnd("combinationsTree")

console.time("combinationsTreeDP")
const comb2 = combinationsTreeDP(testArray)
// console.log((comb2)
console.timeEnd("combinationsTreeDP")

console.time("combinationsTab")
const comb3 = combinationsTab(testArray)
// console.log(comb3)
console.timeEnd("combinationsTab")

console.time("combinationsTab2")
const comb4 = combinationsTab2(testArray)
// console.log(comb4)
console.timeEnd("combinationsTab2")

console.time("combinationsRedableHO")
const comb5 = combinationsRedableHO(testArray)
// console.log(comb5)
console.timeEnd("combinationsRedableHO")

console.time("combinationsPush")
const comb6 = combinationsPush(testArray)
// console.log(comb6)
console.timeEnd("combinationsPush")
