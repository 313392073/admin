/**
 * Created by Administrator on 2017/9/16.
 */
function get(url) {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest()
    req.open('GET', url)
    req.onload = function () {
      if(req.status === 200) {
        resolve(req.response)
      } else {
        reject(Error(req.statusText))
      }
    };
    req.onerror = function () {
      reject(Error('Network Error'))
    };
    req.send()
  })
}

get('story.json').then(function (response) {
  console.log('success',response)
}, function (error) {
  console.error('faild',error)
})

var userCache = {}

function getUserDetail(username) {
  if(userCache[username]) {
    return Promise.resolve(userCache[username])
  }

  return fetch('users/'+ username+ '.json').then(function (result) {
    userCache[username] = result
    return result
  }).catch(function () {
    throw new Error('Could not find user:'+ username)
  })
}

new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(10)
  }, 3000)
})




























