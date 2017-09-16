/**
 * Created by Administrator on 2017/9/16.
 */
fetch('/some/url').then(function (response) {
  return console.log('执行成功，第一步')
}).then(function (returnedValue) {
  console.log('执行成功，第二步')
}).catch(function (err) {
  console.log('中途出错的地方')
})

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users').then(checkStatus).then(parseJSON).then(function (data) {
  console.log('request successded with JSON response', data)
}).catch(function (error) {
  console.log('request failed', error)
})


//html
fetch('/users.html').then(function (response) {
  return response.text()
}).then(function (body) {
  document.body.innerHTML = body
})
//json
fetch('/users.json').then(function (response) {
  return response.json()
}).then(function (json) {
  console.log('parsed json', json)
}).catch(function (ex) {
  console.log('parsing failed', ex)
})
//response metadata
fetch('/users.json').then(function (response) {
  console.log(response.headers.get('Content-Type'))
  console.log(response.headers.get('Date'))
  console.log(response.status)
  console.log(response.statusText)
})

//post form
var form = document.querySelector('form')
fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})

//post json
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
