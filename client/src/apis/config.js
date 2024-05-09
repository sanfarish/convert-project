exports.config = (token) => {
	return { headers: { Authorization: `Bearer ${token}` } }
};

const hostLocal = 'http://localhost:3500';
// const hostNetwork = 'http://192.168.100.7:3500';

exports.hostTarget = hostLocal;