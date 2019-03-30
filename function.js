const NodeCache = require("node-cache");
const myCache = new NodeCache();
const axios = require('axios')
const readline = require('readline-sync')
const url = "http://saral.navgurukul.org/api/courses"
var url_id = [], user, exercise_data, content;

const fun1 = async (resp) => {
    const availableCourses = resp.data.availableCourses
    console.log(availableCourses)
    for (i = 0; i < availableCourses.length; i++) {
        console.log(i + 1, availableCourses[i].name)
        url_id.push(availableCourses[i].id)

    }
}

const fun2 = async (user) => {
    let course_url = `http://saral.navgurukul.org/api/courses/${url_id[user - 1]}/exercises`
    const courses = axios.get(course_url).then((response) => {
        var exercise_data = response.data.data
        return exercise_data
    })
    return courses
}

const func3 = async (courses) => {
    const slug_list = []
    // console.log(courses)
    for (i = 0; i < courses.length; i++) {
        console.log(i + 1, courses[i].name)
        slug_list.push(courses[i].slug)
        for (j = 0; j < courses[i].childExercises.length; j++) {
            slug_list.push(courses[i].childExercises[j].slug)
            console.log("   ", i+1, courses[i].childExercises[j].name)
        }
    }
    return slug_list
}

const fun4 = async (content) => {
    const content_url = "http://saral.navgurukul.org/api/courses/75/exercise/getBySlug?slug=" + content
    let response = await axios.get(content_url)
    console.log(response.data.content)
    content = response.data.content
    return content
}

const response = axios.get(url)
response.then(fun1).then(() => {
    user = readline.question("Enter course in2 which you want to go!")
    return user
}).then(fun2).then(func3).then((slug_list) => {
    const user_input = readline.question("which exercise content do you want:- ")
    const content = slug_list[user_input - 1]
    return content
}).then(fun4).then(async () => {
    while(true){
        const choice = readline.question("'p' for previous and 'n' for next and 'up' for courses and 'exit' for stop the game.:- ")
        if (choice == "up") {
            fun2(user - 1).then(func3)
            
        }
        else if (choice == "n"){
            await fun2(user + 1).then(func3).then((slug_list) => {
                const user_input = readline.question("which exercise content do you want:- ")
                const content = slug_list[user_input - 1]
                return content
            }).then(fun4)
        }
        else if(choice == "p"){
            await fun2(user - 1).then(func3).then((slug_list) => {
                const user_input = readline.question("which exercise content do you want:- ")
                const content = slug_list[user_input - 1]
                return content
            }).then(fun4) 
        }
        else{
            return "wrong input."
        }
        
    }
})