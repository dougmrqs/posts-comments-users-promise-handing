const fetch = require('node-fetch');


class PostsFetcher {

    postsUrl = (page, limit) => `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;

    async fetchPosts(page, limit) {
        let res = await fetch(this.postsUrl(page, limit));
        res = await res.json();
        return res;
    };
};

class CommentsFetcher {

    commentsUrl = (postId) => `https://jsonplaceholder.typicode.com/posts/${postId}/comments`

    async commentsByPost(postId) {
        let res = await fetch(this.commentsUrl(postId));
        res = await res.json();
        return res;
    };

    async commentsByList(postIdList) {
        var commentsPromiseList = [];
        postIdList.forEach((postId) => {
            commentsPromiseList.push(this.commentsByPost(postId));
        })
        let res = await Promise.all(commentsPromiseList);
        return res;
    };

};

class UsersFetcher {

    usersUrl = (userId) => `https://jsonplaceholder.typicode.com/users/${userId}`

    async fetchUser(userId) {
        let res = await fetch(this.usersUrl(userId));
        res = await res.json();
        return res;
    };

    async usersByList(userIdList) {
        var usersPromiseList = [];
        userIdList.forEach(userId => {
            usersPromiseList.push(this.fetchUser(userId));
        });

        let res = await Promise.all(usersPromiseList);
        return res;
    };

};

module.exports = { PostsFetcher, CommentsFetcher, UsersFetcher };