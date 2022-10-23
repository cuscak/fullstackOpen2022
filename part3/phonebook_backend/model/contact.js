/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(_result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const  numberValidator = (telNumber) => {
    const numberRegex = /^\d+$/

    // if formed of two parts
    const dash = telNumber.indexOf('-') //-1 if not found
    if (dash >= 0) {
        const parts = telNumber.split('-')

        if (numberRegex.test(parts.join(''))) {
            if (parts[0].length >= 2 && parts[0].length <= 3) {
                return true
            }

            return false
        }
    } else {
        return numberRegex.test(telNumber)
    }
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        minLength: 8,
        validate: numberValidator
    }
})

personSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', personSchema)