const changeTab1 = (money, coins) => {
  const res = Array(money + 1)
    .fill()
    .map((_) => [])

  res[0] = [[]]

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

const changeHF = (money, coins, change = [], res = []) => {
  if (money === 0) return res.push(change)
  if (money < 0) return 0
  coins.reduce((_, c, i) => changeHF(money - c, coins.slice(i), change.concat(c), res), 0)
  return res
}

const target = 52
const coins = [11, 8, 7, 5]

console.time("changeTab1")
const result1 = changeTab1(target, coins)
// console.log(result1)
console.timeEnd("changeTab1")

console.time("changeTab2")
const result2 = changeTab2(target, coins)
// console.log(result2)
console.timeEnd("changeTab2")

console.time("changeHF")
const result3 = changeHF(target, coins)
// console.log(result3)
console.timeEnd("changeHF")

const changeRec = (amount, coins, change = [], res = []) => {
  let [coin, ...rest] = coins

  if ([undefined, null].includes(coin)) return 0
  if (amount < 0) return 0
  if (amount == 0) return res.push(change)

  changeRec(amount - coin, coins, change.concat([coin]), res)
  changeRec(amount, rest, change, res)

  return res
}

const changeRecTer = (money, coins, indexCoin = 0, indexMoney = coins[0], result = [[[]]].concat(Array(money).fill([]))) => {
  //Here , all the combination have been done we return the result(end of recursion)
  if (indexCoin == coins.length) return result[money]
  // If the array is not initialize , we create it
  let newChg = result[indexMoney - coins[indexCoin]] || []
  /* we check the change value for the current chane + the coin 
  and update the result (for each change previously calculated)
  We filter the original null value from the parameter(first value of result) */
  newChg = newChg.map((x) => x.concat(coins[indexCoin]))
  // We add the new change to the result
  result[indexMoney] = result[indexMoney].concat([...newChg])
  // We handle the indexes for the recursion
  if (indexMoney == money && indexCoin < coins.length) {
    indexCoin += 1
    indexMoney = coins[indexCoin]
  } else if (indexMoney < money) {
    indexMoney += 1
  }

  return changeRecTer(money, coins, indexCoin, indexMoney, result)
}

const changeTabExhaustive = (money, coins) => {
  const res = Array(money + 1)
    .fill()
    .map((_) => [])

  res[0] = [[]]

  for (let iMoney = 0; iMoney <= money; iMoney++) {
    if (res[iMoney].length <= 0) continue
    for (let coin of coins) {
      if (iMoney + coin > money) continue
      const subChange = res[iMoney]
      const newChg = subChange.map((x) => x.concat(coin))
      res[iMoney + coin] = res[iMoney + coin].concat(newChg)
    }
  }

  return res[money]
}

console.time("changeRec")
const result4 = changeRec(target, coins)
// console.log(result4)
console.timeEnd("changeRec")

console.time("changeRecTer")
const result5 = changeRecTer(target, coins)
// console.log(result5)
console.timeEnd("changeRecTer")

console.time("changeTabExhaustive")
// const result6 = changeTabExhaustive(target, coins)
//console.log(result6)
console.timeEnd("changeTabExhaustive")
