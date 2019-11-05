const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const keys = require('./config/keys');
const passport = require("passport");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Data = require('./models/Data');

// Load input validation
const validateRegisterInput = require('./validation/register');
const validateLoginInput = require('./validation/login');

// Load User model
const User = require('./models/User');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is the mondoDB
// this is our MongoDB database
const dbRoute = keys.mongoURI;

mongoose.set('useFindAndModify', false);
// connects our back end code with the database
mongoose.connect(dbRoute, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => console.log('DB Connected'))
    .catch((err) => {
        console.log('DB Connection error:', err.message);
    });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// get all  reviews
router.get('/data/', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.status(404).json({success: false, error: err});
        return res.json({success: true, reviews: data});
    });
});
// get user's reviews
router.get('/data/user/:user_id', (req, res) => {
    console.log('**************************');
    console.log('      get user`s review: ',req.params.user_id);
    console.log('**************************');
    Data.find({user_id: req.params.user_id},(err, data) => {
        if (err) return res.status(404).json({success: false, error: err});
        return res.json({success: true, reviews: data});
    });
});

// update review
router.post('/data/user/:user_id/:review_id', (req, res) => {
    const update = {
        id: req.body.review.id,
        review: req.body.review.update,
        restaurant_name: req.body.restaurant_name,
        rank: req.body.rank
    };
    const id = req.params.review_id;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.status(404).json({success: false, error: err});
        Data.find((err, data) => {
            if (err) return res.status(404).json({success: false, error: err});
            return res.json({success: true, reviews: data});
        });
    });
});

// create new review
router.put('/data/user/:user_id/:review_id', (req, res) => {
    const id = req.params.review_id;
    let data = new Data();
    console.log('req.body:', req.body);
    const {review, name, rank} = req.body;
    if ((!id && id !== 0) || !review) {
        return res.status(404).json({
            success: false,
            error: 'INVALID INPUTS'
        });
    }
    data.review = review;
    data.rank = rank;
    data.restaurant_name = name;
    data.id = id;
    data.user_id = req.params.user_id;
    // save new entry
    data.save((err) => {
        if (err) return res.status(404).json({message: 'Review Not found', success: false, error: err});
        Data.find((err, data) => {
            if (err) return res.status(404).json({message: 'Reviews Not found', success: false, error: err});
            return res.json({success: true, reviews: data});
        });
    });
});

// delete review
router.delete('/data/:review_id', (req, res) => {
    const id = req.params.review_id;
    Data.findByIdAndRemove(id, (err) => {
        if (err) return res.status(404).json({errors: {message: 'Review Not found'}, success: false});
        Data.find((err, data) => {
            if (err) return res.status(404).json({errors: {message: 'Reviews Not found'}, success: false, error: err});
            return res.json({success: true, reviews: data});
        });
    });
});

// REGISTER

router.post('/users/register', (req, res) => {

    console.log('*********************');
    console.log('   register users');
    console.log('*********************');

    // Form validation
    const {errors, isValid} = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exists'});
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// login
router.post('/users/login', (req, res) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: 'Email not found'});
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                            isEditor: user.admin,
                            userId: user.id
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: 'Password incorrect'});
            }
        });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));