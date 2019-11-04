const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is the mondoDB
// this is our MongoDB database
const dbRoute =
    'mongodb+srv://user1:user12019@cluster0-nfapc.mongodb.net/test?retryWrites=true&w=majority';

mongoose.set('useFindAndModify', false);
// connects our back end code with the database
mongoose.connect(dbRoute, { useUnifiedTopology:true, useNewUrlParser: true })
    .then(()=> console.log('DB Connected'))
    .catch((err)=>{
        console.log('DB Connection error:',err.message);
    });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// get all reviews
router.get('/data', (req, res) => {
    Data.find((err, data) => {
        if (err) return res.status(404).json({ success: false, error: err });
        return res.json({ success: true, reviews: data });
    });
});

// update review
router.post('/data/:review_id', (req, res) => {
    const update = {
        id: req.body.review.id,
        review: req.body.review.update
    };
    const id = req.params.review_id;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.status(404).json({ success: false, error: err });
        Data.find((err, data) => {
            if (err) return res.status(404).json({ success: false, error: err });
            return res.json({ success: true, reviews: data });
        });
    });
});

// create existing review
router.put('/data/:review_id', (req, res) => {
    const id = req.params.review_id;
    let data = new Data();
    const {review} = req.body;
    if ((!id && id !== 0) || !review) {
        return res.status(404).json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.review = review;
    data.id = id;
    // save new entry
    data.save((err) => {
        if (err) return res.status(404).json({  message: 'Review Not found', success: false, error: err });
        Data.find((err, data) => {
            if (err) return res.status(404).json({  message: 'Reviews Not found', success: false, error: err });
            return res.json({ success: true, reviews: data });
        });
    });
});

// delete review
router.delete('/data/:review_id', (req, res) => {
    const id = req.params.review_id;
    Data.findByIdAndRemove( id, (err) => {
        if(err) return res.status(404).json({ errors: { message: 'Review Not found' }, success: false });
        Data.find((err, data) => {
            if (err) return res.status(404).json({ errors: { message: 'Reviews Not found' }, success: false, error: err });
            return res.json({ success: true, reviews: data });
        });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));