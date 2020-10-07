const Appender = {
    
    appendUsersToPosts(posts, users) {
        posts.forEach(post => {
            post.user = users.filter(user => user.id == post.userId)[0];
        });
        return posts;
    },

    appendCommentsToPosts(posts, comments) {
        var i = 0;

        posts.forEach(post => {
            let comment = comments[i];
            post.comments = comment;
            i += 1;
        });

        return posts;
    }
};

module.exports = Appender;