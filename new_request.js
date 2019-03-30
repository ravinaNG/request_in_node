const axios = require('axios')
const readline = require('readline-sync')
const url = "http://saral.navgurukul.org/api/courses"
var url_id = []
var response = axios.get(url)
response.then((resp) =>{
    const availableCourses = resp.data.availableCourses
    for(i=0;i<availableCourses.length;i++){
        console.log(i+1,availableCourses[i].name)
        url_id.push(availableCourses[i].id)
    }
}).then(() => {
    const user = readline.question("Enter course in2 which you want to go!")
    return user
}).then((user)=>{
    let course_url = `http://saral.navgurukul.org/api/courses/${url_id[user - 1]}/exercises`
    const courses = axios.get(course_url).then((courses) =>{
        let Exercise_data = courses.data.data
        return Exercise_data
    }).then((Exercise_data)=>{
        const slug_list = []
        for(i=0;i<Exercise_data.length;i++){
            console.log(i+1,Exercise_data[i].name)
            slug_list.push(Exercise_data[i].slug)
            for(j=0; j<Exercise_data[i].childExercises.length; j++){
                slug_list.push(Exercise_data[i].childExercises[j].slug)
                console.log("   ", j+1,'.',end = Exercise_data[i].childExercises[j].name)       
            }
        }
        return slug_list
    }).then((slug_list) => {
        const user_input = readline.question("which exercise content do you want:- ")
        return slug_list[user_input - 1]
    }).then((user_input) =>{
        const content_url = "http://saral.navgurukul.org/api/courses/75/exercise/getBySlug?slug=" + user_input
        axios.get(content_url).then((cont) => {
            console.log(cont.data.content)
            const Exercise_content = cont.data.content
            return Exercise_content
        })
    })
    
})