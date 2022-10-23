/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv').config()

const morgan = require('morgan')
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function getBody(req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const Contact = require('./model/contact')


app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/api/info', (request, response) => {
    Contact.find({}).then(contacts => {
        const p1 = `<p>Phonebook has info for ${contacts.length} people</p>`
        const p2 = Date()
        const div = '<div>' + p1 + p2 + '</div>'
        response.send(div)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Contact.findByIdAndDelete(request.params.id)
        .then(_result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const contact = {
        name: body.name,
        number: body.number,
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    // if (body.name === undefined) {
    //     return response.status(400).json({
    //         error: 'Name is missing'
    //     })
    // }
    // if (body.number === undefined) {
    //     return response.status(400).json({
    //         error: 'Number is missing'
    //     })
    // }

    Contact.find({ name: body.name }).then(result => {
        if (result.length > 0) {
            response.status(400).json({
                error: 'Name must be unique'
            }).end()
        } else {
            const contact = new Contact({
                name: body.name,
                number: body.number,
            })

            contact.save()
                .then(savedContact => {
                    response.json(savedContact)
                })
                .catch(error => next(error))
        }
    })
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })

    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, '0.0.0.0')