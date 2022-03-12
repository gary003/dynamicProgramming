const changeTab1 = (money, coins) => {
  const res = Array(money + 1)
    .fill()
    .map((_) => [])

  res[0] = [[]]

  // For exhaustive permutations of the combinations, just switch the for loops
  for (let coin of coins)
    for (let iMoney = coin; iMoney <= money; iMoney++) {
      const subChange = res[iMoney - coin]
      const newChg = subChange.map((x) => x.concat(coin))
      res[iMoney] = res[iMoney].concat(newChg)
    }

  return res[money]
}

const changeTab2 = (money, coins) => {
  const res = Array(money + 1)
    .fill()
    .map((_) => [])

  res[0] = [[]]

  for (let coin of coins) {
    for (let iMoney = 0; iMoney <= money - coin; iMoney++) {
      // if (res[iMoney].length === 0) continue
      const subChange = res[iMoney]
      const newChg = subChange.map((x) => x.concat(coin))
      res[iMoney + coin] = res[iMoney + coin].concat(newChg)
    }
  }

  return res[money]
}

const changeHOF = (money, coins, change = [], res = []) => {
  if (money === 0) return res.push(change)
  if (money < 0) return 0
  coins.reduce((_, c, i) => changeHOF(money - c, coins.slice(i), change.concat(c), res), 0)
  return res
}

const target = 32
const coins = [23, 19, 13, 17, 7]

console.time("changeTab1")
const result1 = changeTab1(target, coins)
// console.log(result1)
console.timeEnd("changeTab1")

console.time("changeTab2")
const result2 = changeTab2(target, coins)
// console.log(result2)
console.timeEnd("changeTab2")

console.time("changeHOF")
const result3 = changeHOF(target, coins)
// console.log(result3)
console.timeEnd("changeHOF")

const changeRec = (amount, coins, change = [], res = []) => {
  let [coin, ...rest] = coins

  if ([undefined, null].includes(coin)) return 0
  if (amount < 0) return 0
  if (amount == 0) return res.push(change)

  changeRec(amount - coin, coins, change.concat([coin]), res)
  changeRec(amount, rest, change, res)

  return res
}

const changeRecTer = (money, coins, validCoins = coins.filter((c) => c <= money), indexCoin = 0, indexMoney = validCoins[0], result = [[[]]].concat(Array(money).fill([]))) => {
  if (indexCoin == validCoins.length) {
    console.log(result)
    return result[money]
  }

  let changeWithoutCoin = result[indexMoney - validCoins[indexCoin]]

  let changeWithCoin = changeWithoutCoin.map((x) => x.concat(validCoins[indexCoin]))

  result[indexMoney] = result[indexMoney].concat(changeWithCoin)

  // We handle the indexes for the recursion
  if (indexMoney === money && indexCoin < validCoins.length) {
    indexCoin += 1
    indexMoney = validCoins[indexCoin]
  } else if (indexMoney < money) {
    indexMoney += 1
  }

  return changeRecTer(money, coins, validCoins, indexCoin, indexMoney, result)
}

console.time("changeRec")
const result4 = changeRec(target, coins)
// console.log(result4)
console.timeEnd("changeRec")

console.time("changeRecTer")
const result5 = changeRecTer(target, coins)
// console.log(result5)
console.timeEnd("changeRecTer")
