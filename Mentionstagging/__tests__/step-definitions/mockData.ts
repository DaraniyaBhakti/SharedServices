export const apiUserList = {
  data: [
    {
      id: "33",
      type: "account",
      attributes: {
        activated: true,
        country_code: null,
        email: "sidgupta1@gmail.com",
        first_name: "Siddharth",
        full_phone_number: "",
        last_name: "Gupta",
        phone_number: null,
        type: "EmailAccount",
        created_at: "2023-01-19T10:03:35.965Z",
        updated_at: "2023-01-19T10:03:35.965Z",
        device_id: null,
        unique_auth_id: "pTvgsMaeQnA6qn3gfE9CjQtt",
      },
    },
    {
      id: "34",
      type: "account",
      attributes: {
        activated: true,
        country_code: null,
        email: "arvind1@gmail.com",
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: "EmailAccount",
        created_at: "2023-01-23T10:09:31.696Z",
        updated_at: "2023-01-23T10:09:31.696Z",
        device_id: null,
        unique_auth_id: "7dZd432QeIxn7J5QbOcujQtt",
      },
    },
    {
      id: "35",
      type: "account",
      attributes: {
        activated: true,
        country_code: null,
        email: "testtejaswini@gmail.com",
        first_name: null,
        full_phone_number: "",
        last_name: null,
        phone_number: null,
        type: "EmailAccount",
        created_at: "2023-01-24T08:56:38.183Z",
        updated_at: "2023-01-24T08:56:38.183Z",
        device_id: null,
        unique_auth_id: "LSguFM14RMIQfp3PjLHnFQtt",
      },
    },
  ],
};

export const apiPostList = {
  data: [
    {
      id: "22",
      type: "post",
      attributes: {
        id: 22,
        name: "User 24",
        description: "",
        body: "@Siddharth Gupta @User 3 @Vinayak Sharma ",
        location: "hrthrth",
        account_id: 24,
        mentions_ids: [14, 24, 3],
        tags_ids: [1, 24, 3],
        created_at: "20 days ago",
        updated_at: "2023-01-19T09:31:56.516Z",
        model_name: "BxBlockPosts::Post",
        images_and_videos: [],
        media: [],
      },
    },
    {
      id: "88",
      type: "post",
      attributes: {
        id: 88,
        name: "User-24",
        description:
          "@User-35, @Siddharth-Gupta, @User-5, @User-8, @Kuldeep-Patel, @Piyush-Gupta, @Som-Maheshwari, @User-18",
        body: "ffhfg @Kuldeep-Patel @Vinayak-Sharma ",
        location: "ghjhgjghj",
        account_id: 24,
        mentions_ids: [1, 24, 3],
        tags_ids: [1, 24, 3],
        created_at: "6 days ago",
        updated_at: "2023-01-25T05:36:52.679Z",
        model_name: "BxBlockPosts::Post",
        images_and_videos: [],
        media: [],
      },
    },
    {
      id: "89",
      type: "post",
      attributes: {
        id: 89,
        name: "User-24",
        description: "@Siddharth-Gupta, @User-3",
        body: "@Som-Maheshwari @User-6 helloo",
        location: " fbjkdf",
        account_id: 24,
        mentions_ids: [1, 2, 3],
        tags_ids: [1, 2, 3],
        created_at: "6 days ago",
        updated_at: "2023-01-25T08:50:14.885Z",
        model_name: "BxBlockPosts::Post",
        images_and_videos: [],
        media: [],
      },
    },
  ],
};

export const apiPostDetail = {
  data: {
    id: "22",
    type: "post",
    attributes: {
      id: 22,
      name: "User 24",
      description: "",
      body: "Hello @[David Tabaka](5)! How are you?",
      location: "hrthrth",
      mentions_ids: [3, 2, 1],
      tags_ids: [34, 4, 2, 3],
      account_id: 24,
      created_at: "19 days ago",
      updated_at: "2023-01-19T09:31:56.516Z",
      model_name: "BxBlockPosts::Post",
      images_and_videos: [],
      media: [],
    },
  },
};

export const userList = [
  {
    id: "1",
    name: "USER 1",
    email: "USER1@gmail.com",
    isTagged: true,
  },
  {
    id: "2",
    name: "USER 2",
    email: "USER2@gmail.com",
    isTagged: false,
  },
  {
    id: "3",
    name: "USER 3",
    email: "USER3@gmail.com",
    isTagged: true,
  },
  {
    id: "24",
    name: "USER 24",
    email: "USER24@gmail.com",
    isTagged: false,
  },
];

export const createPostTestData = {
  data: {
    attributes: {
      name: "User 1",
      description: "",
      body: "Post Text @[David Tabaka](5)",
      location: "Post Location",
    },
  },
};

export const commentList = {
  data: [
    {
      id: "45",
      type: "comment",
      attributes: {
        id: 45,
        account_id: 10,
        commentable_id: 22,
        commentable_type: "BxBlockPosts::Post",
        comment: "hiii",
        mentions_ids: [1, 24, 3],
        created_at: "2023-01-18T08:38:53.752Z",
        updated_at: "2023-01-18T08:38:53.752Z",
      },
    },
    {
      id: "57",
      type: "comment",
      attributes: {
        id: 57,
        account_id: 10,
        commentable_id: 22,
        commentable_type: "BxBlockPosts::Post",
        comment: "mmm\n",
        mentions_ids: [1, 24, 3],
        created_at: "2023-01-19T06:15:32.388Z",
        updated_at: "2023-01-19T06:15:32.388Z",
      },
    },
  ],
};
export const mentionedList = [
  {
    item: {
      id: "7894",
      postId: "22",
      creatorAccountId: 24,
      isMentioned: true,
      isPost: true,
      commentId: "0",
    },
    index: 0,
  },
  {
    item: {
      id: "6d64",
      postId: "88",
      creatorAccountId: 24,
      isMentioned: false,
      isPost: false,
      commentId: "23",
    },
    index: 1,
  },
];

export const createComment = {
  data: {
    id: "108",
    type: "comment",
    attributes: {
      id: 108,
      account_id: 24,
      post_id: 1,
      comment: "hey test",
      created_at: "2023-01-30T08:58:45.733Z",
      updated_at: "2023-01-30T08:58:45.733Z",
      commentable: {
        id: 1,
        name: "test2",
        description: "",
        category_id: 2,
        created_at: "2023-01-06T04:14:09.389Z",
        updated_at: "2023-01-19T05:41:38.415Z",
        body: "test 00001",
        location: "test2",
        account_id: 10,
      },
      account: {
        id: 24,
        first_name: "Johnn",
        last_name: "Doee",
        email: "BB1@gmail.com",
        activated: true,
        full_name: "BB1",
      },
    },
  },
  meta: {
    success: true,
    message: "Comment created.",
  },
};
export const createComment2 = {
  data: {
    id: "108",
    type: "comment",
    attributes: {
      id: 108,
      account_id: 24,
      post_id: 1,
      comment: "hey test",
      created_at: "2023-01-30T08:54:45.733Z",
      updated_at: "2023-01-30T08:52:45.733Z",
      commentable: {
        id: 1,
        name: "test",
        description: "",
        category_id: 2,
        created_at: "2023-01-06T44:13:09.389Z",
        updated_at: "2023-01-19T15:48:38.415Z",
        body: "test 0000",
        location: "test",
        account_id: 10,
      },
      account: {
        id: 24,
        first_name: null,
        last_name: null,
        email: "BB1@gmail.com",
        activated: true,
        user_name: null,
        full_name: "BB1",
      },
    },
  },
  meta: {
    success: true,
    message: "Comment created.",
  },
};
