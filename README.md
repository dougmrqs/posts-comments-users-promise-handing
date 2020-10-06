# Fetcher for user posts, comments and users

The structure to work on is somewhat like a blog. There are _posts_ that have _comments_. All that made by _users_.     
Each post has an author represented as _userId_, an _id_, a _title_ and a _body_.    
Each comment has a _postId_ to relate with a post, an _id_, a _name_, an _email_, and a _body_.    

## Rules
- Will be fetched 115 posts in total, 20 documents at a time. (1)
- Each time the 20 documents request is completed, load all comments in parallel. (2)
- The next 20 posts shall occur ONLY after the first 20 are fetched.
- After loading all posts, load the users of all the 115 posts in parallel. (3)
    The same user may have more than one post. Do not load the user twice.

## Objective
The final objective is to have a structure like:    

[    
    {    
        .../* post data /    
        user: / post author data /    
        comments: / list of comments for this post */    
    }    
]   

## The API to fetch
(1) - https://jsonplaceholder.typicode.com/posts    
(2) - https://jsonplaceholder.typicode.com/posts/:postId/comments    
(3) - https://jsonplaceholder.typicode.com/users/:userId    
Documentation - https://github.com/typicode/json-server#paginate
