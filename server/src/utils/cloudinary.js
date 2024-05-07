const cloudinary = require('cloudinary').v2;

cloudinary.config({
	cloud_name: process.env.C_NAME || 'dqy6xyibd',
	api_key: process.env.C_KEY || '132588237944935',
	api_secret: process.env.C_SECRET || 'RUc26kIjwhXisYjNvcYBecE1LfM',
	secure: true,
});

exports.cloudinaryUpload = async (path) => {
	try {
		const res = await cloudinary.uploader.upload(path, {
			folder: 'expense_manager',
			use_filename: true
		});
		return res;
	} catch (err) {console.log(err)};
};

exports.cloudinaryDestroy = async (path) => {
	try {
		await cloudinary.uploader.destroy(path);
	} catch (err) {console.log(err)};
};