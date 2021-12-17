const allCombinations = (items) => {
  //console.log(items)
  const table = Array(items.length + 1)
  table[0] = [[]]

  for (let i = 0; i < items.length; i += 1) {
    const oldCombs = table[i]
    const newCombs = []
    // console.log(oldCombs,items[i])
    for (let oldComb of oldCombs) {
      // console.log(oldCombs,items[i])
      for (let j = 0; j <= oldComb.length; j += 1) {
        newCombs.push([...oldComb.slice(0, j), items[i], ...oldComb.slice(j)])
      }
    }

    table[i + 1] = newCombs
  }

  return table[table.length - 1]
}

const arr1 = "abcd".split("")
console.log(allCombinations(arr1))

const arr2 = ["red", "blue"]
console.log(allCombinations(arr2))

const arr3 = [8, 2, 1, 4]
console.log(allCombinations(arr3))
