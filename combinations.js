const combinations1Var = (arr) => {
  let result = [""]

  for (let letter of arr) {
    const newValues = result.map((val) => val.concat(letter))
    result = result.concat(newValues)
  }

  return result
}

const combinationsTab = (arr) => {
  const table = Array(arr.length + 1).fill()
  table[0] = [""]

  for (let i = 0; i < arr.length; i += 1) {
    table[i + 1] = table[i].map((val) => val + arr[i]).concat(table[i])
  }

  return table[arr.length]
}

const combinationsHO = (arr) => {
  return [[""]].concat(Array(arr.length - 1).fill(null)).reduce(
    (acc, _, i) => {
      return acc.concat([acc[i].map((currAcc) => currAcc + arr[i]).concat(acc[i])])
    },
    [[""]]
  )[arr.length]
}

const combinationsRedableHOF = (arr) => {
  const table = Array(arr.length).fill(null)
  table[0] = [""]

  const resultTable = table.reduce(
    (acc, _, i) => {
      const newCombi = acc[i].map((currAcc) => currAcc + arr[i])
      const oldCombi = acc[i]
      const nextSetOfCombi = newCombi.concat(oldCombi)
      return acc.concat([nextSetOfCombi])
    },
    [[""]]
  )

  return resultTable[arr.length]
}

const combinationsRec = (cards) => {
  if (cards.length == 0) return [""]
  const [card, ...rest] = cards

  const allcombsWithoutCard = combinationsRec(rest)
  const allCombsWithCard = []

  for (let c of allcombsWithoutCard) {
    allCombsWithCard.push(card.concat(c))
  }

  return allcombsWithoutCard.concat(allCombsWithCard)
}

const combinationsTree = (cards, hand = [], allHands = [], shift = false) => {
  if (cards.length == 0) return null

  const [card, ...rest] = cards

  if (shift) allHands.push(hand)

  if (hand.filter((x) => x == card).length < cards.filter((x) => x == card).length) combinationsTree(cards, hand.concat([card]), allHands, true)

  combinationsTree(rest, hand, allHands, false)

  return allHands
}

const testArray = "ABCDEFGHIJKLMNOP".split("")

console.time("combinations1Var")
const comb6 = combinations1Var(testArray)
// console.log(comb6)
console.timeEnd("combinations1Var")

console.time("combinationsTab")
const comb3 = combinationsTab(testArray)
// console.log(comb3)
console.timeEnd("combinationsTab")

console.time("combinationsHO")
const comb4 = combinationsHO(testArray)
// console.log(comb4)
console.timeEnd("combinationsHO")

console.time("combinationsRedableHOF")
const comb5 = combinationsRedableHOF(testArray)
// console.log(comb5)
console.timeEnd("combinationsRedableHOF")

console.time("combinationsRec")
const comb2 = combinationsRec(testArray)
// console.log(comb2)
console.timeEnd("combinationsRec")

console.time("combinationsTree")
const comb1 = combinationsTree(testArray)
// console.log(comb1)
console.timeEnd("combinationsTree")
