const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
    const blogPost = await Blog.findById(request.params.id)
    if (blogPost) {
        response.json(blogPost)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {

    const user = request.user

    const body = request.body

    const blog = new Blog({
        title: body.title,
        url: body.url,
        author: body.author,
        user: user._id,
        likes: body.likes
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)

        await user.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        response.status(400).json(exception)
    }
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else{
        response.status(404).json({ error: "you dont have permission to delete this blog post" })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const newBlog = request.body

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogRouter