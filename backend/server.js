const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');
const serverHelper = require('./serverHelper')

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
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, response: data });
    });
});

// create new review
router.post('/data/:review_id', (req, res) => {
    const { id, update } = req.body;
    Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        Data.find((err, data) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, response: data });
        });
    });
});

// update existing method
router.put('/data', (req, res) => {
    console.log('*****************');
    console.log('    put:',req.body);
    console.log('*****************');
    
    let data = new Data();
    const {id, review} = req.body;
    console.log('id:',id);
    console.log('review:',review);
    if ((!id && id !== 0) || !review) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.review = review;
    data.id = id;

    console.log('data:',data);

    data.save((err) => {
        console.log('data save **********');
        console.log('err:',err);
        if (err) return res.json({ success: false, error: err });
        console.log('successful, also return the list');
        // let response = serverHelper.returnData();
        // console.log('response:',response);
        Data.find((err, data) => {
            console.log(' get all teh data: ',data);
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, reviews: data });
        });
    });
});

// delete review
router.delete('/data/:review_id', (req, res) => {
    const id = req.params.review_id;
    console.log('****************************');
    console.log('      req.params:',req.params.review_id);
    console.log('      deleteData:',id);
    console.log('****************************');
    Data.findOneAndUpdate(
        { _id: id, useFindAndModify: false},
        { deleted_at: new Date() }
    ).then(async function(response){
        if(response){
            //, response: serverHelper.returnData(response) }
            return res.status(200).json({ message: 'Review deleted successfully', success: true});
        }
        else{
            return res.status(404).json({ errors: { message: 'Review Not found' }, success: false });
        }
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));