const axios = require('axios')
const readline = require('readline-sync')
const url = "http://saral.navgurukul.org/api/courses"
var url_id = [], user, exercise_data, content;

const getCourses = async (resp) => {
    const availableCourses = resp.data.availableCourses
    for (i = 0; i < availableCourses.length; i++) {
        console.log(i + 1, availableCourses[i].name)
        url_id.push(availableCourses[i].id)

    }
    return url_id
}

const user = async () =>{
    while(true){
        user = readline.question("select any cource:- ")
        if(user > url_id.length || user < 1 ){
            console.log("invalid input.")
        }
        else{
            return user
        }
    }
    
}

const getExercises = async (user) => {
    let course_url = `http://saral.navgurukul.org/api/courses/${url_id[user - 1]}/exercises`
    const courses = axios.get(course_url).then((response) => {
        var exercise_data = response.data.data
        return exercise_data
    })
    while(true){
        if(courses == []){
            user().await(getExercises(user))
        }
        else{
            return courses
        }
    }
}

const childParantExercises = async (courses) => {
    const slug_list = []
    let k = 1
    for (i = 0; i < courses.length; i++) {
        console.log(k, courses[i].name)
        slug_list.push(courses[i].slug)
        for (j = 0; j < courses[i].childExercises.length; j++) {
            slug_list.push(courses[i].childExercises[j].slug)
            console.log(k, courses[i].childExercises[j].name)
        k++
        }
        if(j > courses[i].childExercises.length){
            let k = k - 1
        }
    k++
    }
    return slug_list
}

const contentOfExercise = async (content) => {
    const content_url = "http://saral.navgurukul.org/api/courses/75/exercise/getBySlug?slug=" + content
    let response = await axios.get(content_url)
    console.log(response.data.content)
    content = response.data.content
    return content
}

const response = axios.get(url)


response.then(getCourses).then(user).then(getExercises).then(childParantExercises).then((slug_list) => {
    while (true){
        const user_input = readline.question("which exercise content do you want:- ")
        if(user_input > slug_list.length || user_input < 1){
            console.log("invalid input.")
        }
        else{
            const content = slug_list[user_input - 1]
            return content
        }
    }
}).then(contentOfExercise).then(async () => {
    while (true) {
        const choice = readline.question("'p' for previous and 'n' for next and 'up' for courses and 'exit' for stop the game.:- ")
        if (choice == "up") {
            await getExercises(user - 1).then(childParantExercises)

        }
        else if (choice == "n") {
            await getExercises(user + 1).then(childParantExercises).then((slug_list) => {
                const user_input = readline.question("which exercise content do you want:- ")
                const content = slug_list[user_input - 1]
                return content
            }).then(contentOfExercise)
        }
        else if (choice == "p") {
            await getExercises(user - 1).then(childParantExercises).then((slug_list) => {
                const user_input = readline.question("which exercise content do you want:- ")
                const content = slug_list[user_input - 1]
                return content
            }).then(contentOfExercise)
        }
        else if (choice === "exit") {
            break
        }
        else {
            console.log("wrong input.")
        }
    }
})