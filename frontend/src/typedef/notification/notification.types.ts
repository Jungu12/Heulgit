import { UserType } from '@typedef/common.types';

export type NotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'LIKE' | 'FOLLOW' | 'MENTION' | 'COMMENT';
	createdDate: string;
	hasRead: boolean;
};

export type CommentNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'LIKE' | 'FOLLOW' | 'MENTION' | 'COMMENT';
	createdDate: string;
	hasRead: boolean;
	relatedLink: string;
	content: string;
};

export type FollowNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'LIKE' | 'FOLLOW' | 'MENTION' | 'COMMENT';
	createdDate: string;
	hasRead: boolean;
	follow: boolean;
};

export type CommentMentionNotificationResponseType = {
	notificationId: number;
	receiver: UserType;
	sender: UserType;
	type: 'LIKE' | 'FOLLOW' | 'MENTION' | 'COMMENT';
	createdDate: string;
	hasRead: boolean;
	relatedLink: string;
	content: string;
};
