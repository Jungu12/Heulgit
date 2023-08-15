export const findParter = (id: string, user1: string, user2: string) => {
	if (id === user1) {
		return user2;
	}
	return user1;
};
