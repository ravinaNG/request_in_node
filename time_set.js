const axios = require('axios')
const readline = require('readline-sync')
const url = "http://saral.navgurukul.org/api/courses"

let courses = axios.get(url).then(response => {
    return response.data
}).then((data) => {
    return "Meri marziiii"
})
console.log(courses)


setTimeout(() => {
    console.log("Response after 3 sec", courses)
}, 5000)