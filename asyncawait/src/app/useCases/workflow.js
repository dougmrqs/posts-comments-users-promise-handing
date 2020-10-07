const Fetcher = require('../services/fetcher');
const FetchMany = require('../services/fetchMany');
const idGetter = require('../services/idGetter');
const Appender = require('../services/appender');

class Workflow {

    fetcher = new Fetcher();
    fetchMany = new FetchMany();

    postList = [];

    async work(totalPosts) {
        var page = 1;
        var limit = 20
        while (this.postList.length < totalPosts) {
            let posts = await this.fetcher.fetchPosts(page, limit);
            this.postList = this.postList.concat(posts);
            let postIdList = idGetter.getPostIds(posts);

            let comments = await this.fetchMany.comments(postIdList);

            Appender.appendCommentsToPosts(posts, comments);
            page += 1;

            if ((this.postList.length + limit) > totalPosts) {
                limit = totalPosts - this.postList.length;
            };
        };

        let userIds = idGetter.getUserIds(this.postList);

        let users = await this.fetchMany.users(userIds)

        Appender.appendUsersToPosts(this.postList, users);

        return true;
    };
};


module.exports = Workflow;