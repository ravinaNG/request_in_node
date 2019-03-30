const axios = require('axios')
// var also have to use.
const readline = require('readline-sync')
const url = "http://saral.navgurukul.org/api/courses"
// const exercise = "http://saral.navgurukul.org/api/courses/75/exercises"

var response = axios.get(url)


response.then((resp) => {
	console.log()
	const availableCourses = resp.data.availableCourses
	let course_id_list = []
	console.log("************************WEL COME TO SARAL***************************")

	for (let i = 0; i < availableCourses.length; i++) {
		let course = availableCourses[i]
		console.log(i + 1, course.name)
		// console.log("id:- ", course.id)
		// console.log(" ")
		course_id_list.push(course.id)
	}
	return course_id_list

}).then((courses_id_list) => {
	let user;
	while (true) {
		user = readline.question("About which cource do you want to know enter that number here :- ")

		if ((user > courses_id_list.length) || (user < 0)) {
			console.log("Aapne galat input select kia hai. Please dubara kosish kare.")
		} else {
			break;
		}
	};
	return courses_id_list[user - 1];

}).then((id) => {
	const exercise = `http://saral.navgurukul.org/api/courses/${id}/exercises`
	axios.get(exercise)
		.then((ex_res) => {
			const all_exercise = ex_res.data.data
			const slug_list = []
			for (let i = 0; i < all_exercise.length; i++) {
				const exercise = all_exercise[i];
				let exercise_name = (exercise.name)
				slug_list.push(exercise.slug)
				console.log(exercise_name)

				for (let i = 0; i < exercise.childExercises.length; i++) {
					const child_exercise = exercise.childExercises[i];
					let child_exercise_name = (child_exercise.name)
					slug_list.push(child_exercise.slug)
					console.log("	",child_exercise_name)
				}

			}
		})


})


























// console.log("################################if (exercise.parentExerciseId === null){
            //     let exercise_name=(exercise.name)
            //     slug_list.push(exercise.slug)
            //     console.log(exercise_name,"parantal exercise")
            //     // console.log('-----------------------------')
            // }else if (exercise.parentExerciseId !== null) {
            //     let exercise_name=(exercise.name)
            //     slug_list.push(exercise.slug)
            //     console.log(exercise_name,"nonparental")
            //     // console.log('-----------------------------')

            //     for (let i = 0; i < exercise.childExercises.length; i++) {
            //         const child_exercise = exercise.childExercises[i];
            //         let child_exercise_name=(child_exercise.name)
            //         slug_list.push(child_exercise.slug)
            //         console.log(child_exercise_name,"chiled_exercise")
            //         // console.log(slug_list)
            //     }############################")
// console.log (course_id_list)
// user = readline.question("About which cource do you want to know enter that number here :- ")
// const exercise = "http://saral.navgurukul.org/api/courses" + "/" + "${user}" + "/exercises"
// // console.log (exercise) 
// var ex_response = axios.get(exercise)
// console.log(ex_response)
    // .then((resp) => {
        // console.log ("************************************************")
        // console.log (resp)
        // console.log ("************************************************")
    // const exercise_data = resp.data
    // console.log ("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
    // console.log (exercise_data)
    // console.log ("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
    // let exercise = exercise_data.childExercises
    //     console.log (exercise)
    // for(let i = 0; i<exercise_data.length; i++){
    //     // let exercise = exercise_data[i]["childExercises"]
    //     let exercise = exercise_data.childExercises
    //     console.log (exercise)
    //     console.log (exercise.name)
    // }
    // console.log ("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    // })
// })