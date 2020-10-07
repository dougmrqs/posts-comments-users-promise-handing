class Appender {

    static appendCommentsToPosts(posts, comments) {
        var i = 0;

        posts.forEach(post => {
            let comment = comments[i];
            post.comments = comment;
            i += 1;
        });

        return posts;
    };

    static appendUsersToPosts(postsList, usersList) {
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
};

module.exports = Appender;