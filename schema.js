const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.db_URL)
  .then((data) =>{
    console.log(`Connected to database: ${data.connection.host}`);
})
.catch((err) =>{
    console.error(`Error connecting to database: ${err.message}`);
});
};

module.exports = connectDatabase;



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
