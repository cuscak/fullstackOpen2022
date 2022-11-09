const blog = require('../models/blog')
const listHelper = require('../utils/list_helper')


const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

describe('total likes', () => {


    test('when list is empty, should be 0 likes', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('for list with many blogs, should return sum of all likes from every blog', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favotire blog', () => {


    test('when list is empty, should return undefined', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog, then its the most favorite one', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('for list with many blogs, should return first blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})

describe('Author of most blogs', () => {

    test('when list is empty, should return undefined', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog, then it returns its author and count 1', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                blogs: 1
            }
        )
    })

    test('for list with many blogs, should return author with most blog entries', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual(
            {
                author: 'Robert C. Martin',
                blogs: 3
            }
        )
    })
})

describe('Most liked Author', () => {

    test('when list is empty, should return undefined', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(undefined)
    })

    test('when list has only one blog, then it returns its author and likes from his blog post', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                likes: 5
            }
        )
    })

    test('for list with many blogs, should return author with most count of likes from his posts', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual(
            {
                author: 'Edsger W. Dijkstra',
                likes: 17
            }
        )
    })
})