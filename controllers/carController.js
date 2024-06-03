import {v4 as uuidv4} from 'uuid';

import { Car } from "../models/cars"




// works with mongoDB
export const getCars = async (req, res) => {
    try {
        Car.find()
        .then((cars) => {
            res.status(200).json({cars: cars})
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({msg: "unable to get cars"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "unable to get cars"})
    }
}

// works with mongoDB
export const getCar = async (req, res) => {
    try {
        const id = req.params.id
        Car.findById(id)
        .then((cars) => {
            res.status(200).json({car: cars})
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({msg: "unable to get car"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "unable to get car"})
    }
};

// works with mongoDB
export const search = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm
        
        const searchRegex = new RegExp(searchTerm, "i")
        
        await Car.find({
            $or : [
                {make: searchRegex},
                {model: searchRegex},
                // {buildYear: searchRegex},
                // {doors: searchRegex},
                // {horsePower: searchRegex}
            ]
        })
        .then((cars) => {
            if(cars.lenght){
                console.log(cars)
                res.status(200).json({cars: cars})
            }
            else{
                res.status(200).json({cars: [], msg: "no cars found"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({msg: "unable to find car"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "unable to get car"})
    }
};

// works with mongoDB
export const createCar = async (req, res) => {
    try {
        const car = new Car(req.body)
        await car.save()
        .then((savedCars) => {
            console.log(savedCars)
            res.status(201).json({msg: 'car saved', car})
        })
        .catch ((error) => {
            console.log(error)
            res.status(500).json({msg: 'unable to create new car', car})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'unable to save new car'})
    }
    
}

// works with mongoDB
export const deleteCar = async (req, res) => {
    try {
        const id = req.params.id

        await Car.findByIdAndDelete(id)
        .then((cars) => {
            res.status(200).json({msg: "Following car has been deleted", car: cars})
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({msg: "unable to get car"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "unable to get car"})
    }
}

// works with mongoDB
export const updateCar = async (req, res) => {
    try {
        const id = req.params.id
        const updatedCar = req.body

        await Car.findOneAndUpdate({_id: id}, updatedCar, {new: true})
        .then((updatedCar) => {
            console.log(updatedCar)
            res.status(200).json({msg: "car updated", car: updatedCar})
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({msg: "unable to update car"})
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "unable to update car"})
    }
}