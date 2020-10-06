const FetchController = require('./FetchController');
const Fetcher = require('../utils/fetcher');

const fetcher = new Fetcher();
const fetchController = new FetchController();

function fetchAndAppend(posts, totalPosts, page, limit) {
    return fetcher.fetchPosts(page, limit)
        .then(fetchedPosts => {
            const postIdList = fetchController.getPostIdSet(fetchedPosts);

            return fetchController.loadComments(postIdList)
                .then(comments => {
                    return fetchController.appendCommentsToPosts(fetchedPosts, comments);
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
            const userIds = fetchController.getUserIdSet(postList);
            return fetchController.loadUsers(userIds)
                .then(users => {
                    return fetchController.appendUsersToPosts(postList, users);
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};

module.exports = work;