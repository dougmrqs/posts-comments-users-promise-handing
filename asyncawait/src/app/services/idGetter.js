const idGetter = {

    getPostIds(posts) {
        let postIdList = [];
        posts.forEach(post => postIdList.push(post.id));
        postIdList = [...new Set(postIdList)];

        return postIdList;
    },

    getUserIds(posts) {
        let userIdList = [];
        posts.forEach(post => userIdList.push(post.userId));
        let uniqueUserId = [...new Set(userIdList)]

        return uniqueUserId;
    }
};

module.exports = idGetter;