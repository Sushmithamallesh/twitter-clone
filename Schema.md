# database schema

## Table: users

| column      | data type   | extra info(if needed)|
| :---        |    :----:   |          ---:        |
| id          | uuid        |                      |
| username    | string(20)  |                      |
| name        | string(60)  |                      |
| profilePicture | string(url)|                    |
| bio | text(40)|                                  |
| followerCount | bigInt |
| followingCount | bigInt |

## Table: posts

| column      | data type | extra info(if needed)|
| :---        |    :----:   |          ---: |
| id          | uuid        |               |
| text        | text(140)   |               |
| authorId   | uuid        | foreignkey(user.id)|
| likeCount   | bigint      ||

## Table: likes

| column      | data type | extra info(if needed)|
| :---        |    :----:   |          ---: |
| id      | uuid       |    |
| postId   | uuid        | foreignkey(post.id)     |
| userId | uuid | foreignkey(user.id)|

## Table: userFollows

| column      | data type | extra info(if needed)|
| :---        |    :----:   |          ---: |
| id      | uuid       |   |
| followerId   | uuid        | foreignkey(user.id)      |
| followeeId | uuid | foreignkey(user.id)|
