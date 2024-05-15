const config = (token) => {
	return { headers: { Authorization: `Bearer ${token}` } };
};

// const hostTarget = 'http://localhost:3500/api/v1';
const hostTarget = 'https://api.expensemanager.biz.id/api/v1';

export { config, hostTarget };