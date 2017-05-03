/*eslint no-undef: 0*/

export default () =>
  new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position)
      })
    } else {
      reject('Geolocation not supported.')
    }
  })