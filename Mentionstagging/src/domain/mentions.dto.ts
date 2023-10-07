export interface UserListTaggedItem {
  id: string;
  name: string;
  email: string;
  isTagged: boolean;
}

export interface UserListItem {
  id: string;
  name: string;
}

export interface CommentListItem {
  id: string;
  name: string;
  accountID: number;
  postID: number;
  commentText: string;
  mentions_ids: number[];
  isDestroyed: boolean;
  isNewOption: boolean;
}

export interface MentionedList {
  id: string;
  commentId: string;
  creatorAccountId: number;
  postId: string;
  isMentioned: boolean;
  isPost: boolean;
}

export interface PostListResponse {
  attributes: {
    mentions_ids: number[];
    account_id: number;
    tags_ids: number[];
    body: string;
    location: string;
    name: string;
    description: string;
  };
  id: string;
}

export interface CommentListResponse {
  attributes: {
    comment: string;
    mentions_ids: number[];
    account_id: number;
    post_id: number;
  };
  id: string;
}

export interface UserListResponse {
  attributes: {
    first_name: string | null;
    last_name: string | null;
    email: string;
  };
  id: string;
}

export interface PostListItem {
  id: string;
  body: string;
  location: string;
  title: string;
  description: string;
  accountId: number;
  mentions_ids: number[];
  tags_ids: number[];
}
