const FetchMany = require('../services/fetchMany');
const Fetcher = require('../services/fetcher');
const IdGetter = require('../services/idGetter');
const Appender = require('../services/Appender');

const fetcher = new Fetcher();
const fetchMany = new FetchMany();

function fetchAndAppend(posts, totalPosts, page, limit) {
    return fetcher.fetchPosts(page, limit)
        .then(fetchedPosts => {
            const postIdList = IdGetter.getPostIdSet(fetchedPosts);

            return fetchMany.loadComments(postIdList)
                .then(comments => {
                    return Appender.appendCommentsToPosts(fetchedPosts, comments);
                })
                .catch(error => console.log(error));
        })
        .then(fetchedPosts => {
            const postList = posts.concat(fetchedPosts);

            if (postList.length + limit > totalPosts) {
                limit = totalPosts - postList.length;
            };

            if (postList.length < totalPosts) {
                page += 1;
                return fetchAndAppend(postList, totalPosts, page, limit);
            };

            return postList;
        })
        .catch(error => console.log(error));
};

function work(totalPosts) {
    const initialPosts = [];
    const initialPage = 1;
    const initialLimit = 20;

    return fetchAndAppend(initialPosts, totalPosts, initialPage, initialLimit)
        .then(postList => {
            const userIds = IdGetter.getUserIdSet(postList);
            return fetchMany.loadUsers(userIds)
                .then(users => {
                    return Appender.appendUsersToPosts(postList, users);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};

module.exports = work;