module.exports = {
	port: process.env.PORT || 3001,
	db: process.env.MONGODB || 'mongodb://localhost:27017/shop', //PROD o un string.
	SECRET_TOKEN: 'miclaveloca' //Poner uno mas largo y complejo.
}
