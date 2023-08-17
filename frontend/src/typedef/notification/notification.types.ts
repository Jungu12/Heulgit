import { UserType } from '@typedef/common.types';

export type LikeNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'LIKE';
	relatedLink: string;
	createdDate: string;
	hasRead: boolean;
};

export type CommentNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'COMMENT';
	createdDate: string;
	hasRead: boolean;
	relatedLink: string;
	content: string;
};

export type FollowNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'FOLLOW';
	createdDate: string;
	hasRead: boolean;
	follow: boolean;
};

export type CommentMentionNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'MENTION';
	createdDate: string;
	hasRead: boolean;
	relatedLink: string;
	content: string;
};

export type UnionNotificationType =
	| LikeNotificationResponseType
	| CommentNotificationResponseType
	| FollowNotificationResponseType
	| CommentMentionNotificationResponseType;
