const Fetcher = require('../utils/fetcher');

class FetchController {

    fetcher = new Fetcher();

    fetchTwenty(page) {
        return this.fetcher.fetchPosts(page, 20)
    };

    loadComments(postIdList) {
        var promiseList = [];
        postIdList.forEach(postId => {
            promiseList.push(this.fetcher.fetchComments(postId));
        });
        return Promise.all(promiseList);
    };

    loadUsers(userIdList) {
        var promiseList = [];
        userIdList.forEach(userId => {
            promiseList.push(this.fetcher.fetchUser(userId));
        });
        return Promise.all(promiseList);
    };

    appendComments(post, comments) {
        post.comments = comments;
        return post;
    };

    appendCommentsToPosts(posts, comments) {
        var i = 0;

        posts.forEach(post => {
            let comment = comments[i];
            post.comments = comment;
            i += 1;
        });

        return posts;
    };


    appendUsersToPosts(postsList, usersList) {
        postsList.forEach(post => {
            const postId = post.userId;
            usersList.forEach(user => {
                if (user.id == postId) {
                    return post.user = user;
                };
            });
        });
        return postsList;
    };

    getPostIdSet(posts) {
        var postIdSet = new Set();

        posts.forEach(post => {
            postIdSet.add(post.id)
        });
        return postIdSet;
    };

    getUserIdSet(posts) {
        var userIdSet = new Set();

        posts.forEach(post => {
            userIdSet.add(post.userId);
        })
        return userIdSet;
    };


};

module.exports = FetchController;