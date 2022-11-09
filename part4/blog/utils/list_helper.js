var _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
    const clone = [...blogs]
    return clone.sort((b1, b2) => {
        return b2.likes - b1.likes
    })[0]
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return undefined
    }

    const authorsBlogCount = _.countBy(blogs, blog => {
        return blog.author
    })

    const keys = Object.keys(authorsBlogCount);
    let max = authorsBlogCount[keys[0]];
    let author = keys[0];
    _.forEach(authorsBlogCount, (value, key) => {
        if (value > max) {
            max = value
            author = key
        }
    })

    return {
        author: author,
        blogs: max
    }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return undefined
    }

    const groupedByAuthor = _.groupBy(blogs, blog => {
        return blog.author
    })

    let authorsWithTotalLikes = []
    _.forEach(groupedByAuthor, (value, key) => {

        const onlyLikes = _.map(value, blog => {
            return blog.likes
        })

        const totalLikes = _.reduce(onlyLikes, (sum, likes) => {
            return likes + sum
        }, 0)

        authorsWithTotalLikes.push({
            author: key,
            likes: totalLikes
        })
    })

    return _.maxBy(authorsWithTotalLikes, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}