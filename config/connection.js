const mongoose = require('mongoose');

// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.MONGO_URI? 'process.env.MONGO_URI? "mongodb+srv://admin:Password@cluster1.xupjqjl.mongodb.net/?retryWrites=true&w=majority':"mongodb://localhost:27017/dogs", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection
module.exports = mongoose.connection;
