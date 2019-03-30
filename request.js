const axios = require('axios')
const readline = require('readline-sync');
const fs = require('fs')
let url = "http://saral.navgurukul.org/api/courses"

const courses_path = 'courses.json'
let course_id_list = []
function start() {
    if (fs.existsSync(courses_path)) {
        console.log("reading file....")
        const fileContent = fs.readFileSync(courses_path)
        const jsonContent = JSON.parse(fileContent)
        return Promise.resolve(jsonContent)
    } else {
        console.log("calling api to server")
        return axios.get(url).then((response) => {
            const json = JSON.stringify(response.data)
            // console.log(json)
            fs.writeFileSync(courses_path, json)
            return response.data
        })
    }
}
start().then((response) => {
    const availableCourses = response.availableCourses
    let count = 0
    while (count < availableCourses.length) {
        console.log(count + 1, availableCourses[count].name)
        course_id_list.push(availableCourses[count].id)
        count++
    }
}).then(() => {
    const user = readline.question("Type course number:- ")
    return user
}).then((user) => {
    let course_url = `http://saral.navgurukul.org/api/courses/${course_id_list[user - 1]}/exercises`
    return axios.get(course_url)
        .then((course_conten) => {
            const exercises = course_conten.data.data
            return exercises
        }).then((exercises) => {
            let count = 0
            let slug_list = []
            let number = 1
            let num = 0
            while (count < exercises.length) {
                num = number
                const parentExercise = exercises[count]   // why not let why const
                slug_list.push(parentExercise.slug_list)
                console.log(number, parentExercise.name)
                let counter = 0
                let same = 0
                while (counter < parentExercise.childExercises.length) {
                    if (number == num) {
                        number = number + 1
                    }
                    const childExercise = parentExercise.childExercises[counter] // why not let why const
                    slug_list.push(childExercise.slug)
                    console.log("   ", number, childExercise.name)
                    counter++
                    number++
                    same = number
                }
                if (same == number) {
                    number = number - 1
                }
                count++
                number++
            }
            return slug_list
        })
}).then((slug_list) => {
        const contain = readline.question("About which exercise do you want to know:- ")
        const exechildExercisesrcise_contain = slug_list[contain - 1]
        return exercise_contain
}).then((exercise_contain) => {
    // const exercise_content_url = course_url + `/getBySlug?slug=${exercise_contain}`
    const exercise_content_url = `http://saral.navgurukul.org/api/courses/${course_id_list[user - 1]}/exercises/getBySlug?slug=${exercise_contain}`
    return axios.get(exercise_content_url).then((resp) =>{
        console.log(resp.data.content)
    })
})






























// function start (){
//     if (fs.existsSync(courses_path)){
//         // Read the file
//         const fileContent = fs.readFileSync(courses_path);
//         // console.log(fileContent)
//         // parse the Json object from file content which is in string
//         const jsonContent = JSON.parse(fileContent)
//         console.log("Reading from cache....")
//         // console.log(jsonContent)
//         // return a promise
        // return Promise.resolve(jsonContent)
//     } else {
//         console.log("Calling the server....")
//         return axios.get(url).then((response) => {
//             // convert the json into a string
//             const json = JSON.stringify(response.data)
//             console.log(json)
//             // write the string in the courses.json
//             fs.writeFileSync(courses_path, json);
//             return response.data
//         })
//     }
// }
// console.log(start())

// start().then((response) => {
//     const availableCourses =  response.availableCourses;
//     let count = 0;
//     while(count < availableCourses.length){
//         console.log(count+1, availableCourses[count].name)
//         count++;
//     }       
// })