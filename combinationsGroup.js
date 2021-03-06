const makeGroups = (arr, groupLength = 2) => {
  const result = Array(arr.length + 1)
  result[0] = [[]]

  for (let i = 1; i <= arr.length; i += 1) {
    result[i] = result[i - 1]
      .map((x) => [...x, arr[i - 1]])
      .concat(result[i - 1])
      .filter((x) => x.length <= groupLength)
  }

  return result[arr.length].filter((x) => x.length == groupLength)
}

const arr = "abcde".split("")

console.log(makeGroups(arr))
console.log(makeGroups(arr, 3))
console.log(makeGroups(arr, 4))
