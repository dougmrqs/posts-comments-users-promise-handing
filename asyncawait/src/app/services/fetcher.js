const fetch = require('node-fetch');

class Fetcher {

    postsUrl = (page, limit) => `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    commentsUrl = (postId) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    usersUrl = (userId) => `https://jsonplaceholder.typicode.com/users/${userId}`

    async fetchPosts(page, limit) {
        let res = await fetch(this.postsUrl(page, limit));
        res = await res.json();
        return res;
    };

    async fetchComments(postId) {
        let res = await fetch(this.commentsUrl(postId));
        res = await res.json();
        return res;
    };

    async fetchUser(userId) {
        let res = await fetch(this.usersUrl(userId));
        res = await res.json();
        return res;
    };

};

module.exports = Fetcher;