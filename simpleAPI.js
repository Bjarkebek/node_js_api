//
// simple REST api with joi
//

import Joi from 'joi'
import express from 'express'
const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
]

app.get('/', (req, res) => {
   res.send('hello world !!!') 
});

// get all
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// get course with id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send('course not found')
    res.send(course);
    
})


// post new course
app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)
    if ( error) return res.status(400).send(error.details[0].message)

    const course = {
        id: courses.length +1,
        name: req.body.name,
    };
    
    courses.push(course);
    res.send(course);
})

// update existing course
app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('course not found')

    const { error } = validateCourse(req.body)
    if ( error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name
    res.send(course);
})

// delete existing course
app.delete('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return res.status(404).send('course not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)

    res.send(course)

})

// validate if input is OK
function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}



// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => { console.log(`Listening on port ${port}...`)})