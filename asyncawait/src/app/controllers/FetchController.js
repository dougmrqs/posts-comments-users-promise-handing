const { PostsFetcher, CommentsFetcher, UsersFetcher } = require('../utils/fetcher');

class FetchController {

    postsFetcher = new PostsFetcher();
    commentsFetcher = new CommentsFetcher();
    usersFetcher = new UsersFetcher();

    postList = [];

    getPostIds(posts) {
        let postIdList = [];

        posts.forEach(post => postIdList.push(post.id));

        return postIdList;
    };

    getUserIds(posts) {
        let userIdList = [];
        posts.forEach(post => userIdList.push(post.userId));
        let uniqueUserId = [...new Set(userIdList)]

        return uniqueUserId;
    };

    appendUsersToPost(posts, users) {
        posts.forEach(post => {
            post.user = users.filter(user => user.id == post.userId);
        });
        return posts;
    };

    appendCommentsToPost(posts, comments) {
        var i = 0;

        posts.forEach(post => {
            let comment = comments[i];
            post.comments = comment;
            i += 1;
        });

        return posts;
    };

    async work(totalPosts) {
        var page = 1;
        var limit = 20
        while (this.postList.length < totalPosts) {
            let posts = await this.postsFetcher.fetchPosts(page, limit);
            this.postList = this.postList.concat(posts);
            let postIdList = this.getPostIds(posts);

            let comments = await this.commentsFetcher.commentsByList(postIdList);

            this.appendCommentsToPost(posts, comments);
            page += 1;

            if ((this.postList.length + limit) > totalPosts) {
                limit = totalPosts - this.postList.length;
            };
        };

        let userIds = this.getUserIds(this.postList);

        let users = await this.usersFetcher.usersByList(userIds)
        
        this.appendUsersToPost(this.postList, users);

        return true;
    };
};


module.exports = FetchController;