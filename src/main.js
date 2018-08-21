require('babel-runtime/regenerator')
require('./main.css')
require('./index.html')

let a = async (args) => {
  const { a, b } = args
  await console.log('Future', a, b)
  console.log('Done')
}

a({ a:1, b: 2 })