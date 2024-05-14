const config = (token) => {
	return { headers: { Authorization: `Bearer ${token}` } }
};

// const hostTarget = 'http://localhost:3500';
const hostTarget = 'http://192.168.179.53:3500';

export { config, hostTarget };