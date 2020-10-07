const Fetcher = require('./fetcher');

class FetchMany {

    fetcher = new Fetcher();

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
};

module.exports = FetchMany;