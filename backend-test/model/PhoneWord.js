const phoneword = {}

const numbers = {
  2: ['a','b','c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
  0: [' '],
}

const undergrade = (list) => [].concat.apply([], list)

const reducer = (accumulator, current) =>
  undergrade(accumulator.map(elementBase => current.map(elementCurrent => undergrade([ ...elementBase, elementCurrent ]))))

const cartesianProduct = (lists) => lists.reduce(reducer, [[]])

phoneword.getValues = ( input ) => {
  const length = input.length
  let lists = [...input]
  lists = lists.map(element => numbers[element])
  return auxFunction(length, lists, input)
}

auxFunction = (length, lists, input, previous, answer) => {
  if(length < 1)
  {
    return answer
  }

  if(answer === undefined){
    if(length === 1){
      return lists
    }
    const listsToProcess = [lists[0], lists[1]]
    return auxFunction(length-2, lists.slice(2), input.slice(2), [input[0], input[1]], cartesianProduct(listsToProcess))
  }
  else{
    const listsToProcess = [answer, lists[0]]
    return auxFunction(length-1, lists.slice(1), input.slice(1), undergrade([previous, input[0]]), cartesianProduct(listsToProcess))
  }

}

module.exports = phoneword
