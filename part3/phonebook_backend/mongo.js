/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.vaothg9.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', personSchema)

if (process.argv.length === 3) {
    mongoose
        .connect(url)
        .then((_result) => {
            console.log('Retreiving all contacts')
            return Contact.find({})
        })
        .then(result => {
            result.forEach(note => {
                console.log(note)
            })
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))

} else {
    const contactName = process.argv[3]
    const contactNumber = process.argv[4]

    mongoose
        .connect(url)
        .then((_result) => {
            console.log('Adding new contact')

            const contact = new Contact({
                name: contactName,
                number: contactNumber
            })

            return contact.save()
        })
        .then(() => {
            console.log('contact saved!')
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}