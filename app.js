import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import carRoutes from './routes/carRoutes.js'

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

const dbConnect = async() => {
    try {
        await mongoose.connect('mongodb://localhost:27017/carDB', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            autoIndex: true,
        });
        console.log('connected to DB')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

dbConnect();



const PORT = 5000;

app.listen(PORT, () => { console.log(`Listening on port: http://localhost:${PORT}`)})




app.use('/api/cars', carRoutes);

app.get('/', (req, res) => res.send('Hello from homepage'));
