const fetch = require('node-fetch');

class Fetcher {

    postsUrl = (page, limit) => `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    commentsUrl = (postId) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
    usersUrl = (userId) => `https://jsonplaceholder.typicode.com/users/${userId}`;

    fetchPosts(page, limit) {
        return fetch(this.postsUrl(page, limit))
                .then(res => res.json())
                .catch(error => console.log(error));
    };

    fetchComments(postId) {
        return fetch(this.commentsUrl(postId))
                .then(comments => comments.json())
                .catch(error => console.log(error));
    };

    fetchUser(userId){ 
        return fetch(this.usersUrl(userId))
                .then(users => users.json())
                .catch(error => console.log(error));
    }
};


module.exports = Fetcher;