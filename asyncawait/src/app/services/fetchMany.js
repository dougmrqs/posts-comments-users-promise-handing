const Fetcher = require('./fetcher');

class FetchMany {

    fetcher = new Fetcher();

    async comments(postIdList) {
        var commentsPromiseList = [];
        postIdList.forEach((postId) => {
            commentsPromiseList.push(this.fetcher.fetchComments(postId));
        })
        let res = await Promise.all(commentsPromiseList);
        return res;
    };

    
    async users(userIdList) {
        var usersPromiseList = [];
        userIdList.forEach(userId => {
            usersPromiseList.push(this.fetcher.fetchUser(userId));
        });

        let res = await Promise.all(usersPromiseList);
        return res;
    };

};

module.exports = FetchMany;