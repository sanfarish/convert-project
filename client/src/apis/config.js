const accessToken = localStorage.getItem('accessToken');

exports.config = {
	headers: { Authorization: `Bearer ${accessToken}` }
};