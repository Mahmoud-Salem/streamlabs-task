// Requiring dependencies
import express from 'express';
import bodyParser from 'body-parser';
import seedDB from './controllers/seedDB.js';
import cors from 'cors';

// requiring routes
import routes from './routes/routes.js';

// Initializing app
var app = express();
// Seed Database with top 1000 streams on startup

seedDB();
// setup middleware
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }))
;
app.options('*', cors());  // enable pre-flight
app.use(cors());

// Using routes
app.use('/',routes);

export default app ;