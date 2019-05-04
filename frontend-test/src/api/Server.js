export const Server = {}

const server = '/api'
const axios = require('axios')

Server.searchResults = (value) => {
  const fd = []
  fd.push(`${encodeURIComponent('input')}=${encodeURIComponent(value)}`)
  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return new Promise((resolve)=>{
    axios.post(`${server}/index/`, fd.join('&'), config)
      .then(response => {
        resolve(response.data)
      })
      .catch(err => window.alert("algo salio mal"))
    })
}