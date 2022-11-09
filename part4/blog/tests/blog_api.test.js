const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: "Uknown",
        url: "some url",
        likes: 0,
    },
    {
        title: 'Another blog post',
        author: "AC",
        url: "some url",
        likes: 0,
    },
]

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RlciIsImlkIjoiNjM2YmYyYmYyMWM2M2QwM2ZlZGRhZjY1IiwiaWF0IjoxNjY4MDE4OTcxfQ.QgulikfKliZ2cCF42Cz2sZL8GM1d059nHkgg9-SyEcU'

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    const newBlogPost = {
        title: 'With user',
        author: "Tester",
        url: "www.test.com",
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogPost)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length + 1) // 1 blog post is added via post request
})

test('blog unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('blog can be added', async () => {
    const newBlogPost = {
        title: 'Added from test',
        author: "test",
        url: "www.test.com",
        likes: 999,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Added from test'
    )
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlogPost = {
        title: 'Likes test',
        author: "test",
        url: "www.test.com",
    }

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + token)
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await Blog.find({ title: 'Likes test' })
    expect(result[0].likes).toBe(0)
})

test('wont save blog post if the title or url properties are missing from the request data', async () => {
    const newBlogPost = {
        author: "test",
        url: "www.test.com",
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(400)
})

test('update deteils in the blog post', async () => {
    const allBlogPosts = await Blog.find({})

    const allBlogPostsJSON = allBlogPosts.map(blogPost => blogPost.toJSON())

    const title = '...but fullstack is not!'
    const newBlogpost = { ...allBlogPostsJSON[0], title: title }

    await api
        .put(`/api/blogs/${newBlogpost.id}`)
        .send(newBlogpost)

    const updatedBlog = await Blog.find({ title: title })

    expect(updatedBlog[0].title).toBe(title)
})

test('delete blog post', async () => {
    const allBlogPosts = await Blog.find({})

    const allBlogPostsJSON = allBlogPosts.map(blogPost => blogPost.toJSON())

    const blogPostToDeleteId = allBlogPostsJSON[2].id

    await api
        .delete(`/api/blogs/${blogPostToDeleteId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const deletedBlogPost = await Blog.find({ title: blogPostToDeleteId.title })

    expect(deletedBlogPost).toStrictEqual([])
})

afterAll(() => {
    mongoose.connection.close()
})