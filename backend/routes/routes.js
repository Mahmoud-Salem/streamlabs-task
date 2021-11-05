// Routes file
import Router from 'express-promise-router' ;
import controllers from '../controllers/controllers.js';
import isLoggedIn from '../authentication/checkLogged.js';
import authenticate from '../authentication/authentication.js';
const router = new Router();

// authentication to create token for users after twitch authentication
router.get('/',authenticate.login);
// authentication to validate twitch token and create a jwt token for users
router.get('/validate-token',authenticate.checkTwitchToken);

// Get number of streams for each game SQL & Coding
router.get('/totalAmountOfStreamsSQL',isLoggedIn,controllers.totalAmountOfStreamsSQL);
router.get('/totalAmountOfStreamsCoding',isLoggedIn,controllers.totalAmountOfStreamsCoding);

// Get Most viewed streams for each game SQL & Coding
router.get('/highestViewerPerGameSQL',isLoggedIn,controllers.highestViewerPerGameSQL);
router.get('/highestViewerPerGameCoding',isLoggedIn,controllers.highestViewerPerGameCoding);

// Get Median of viewers for all streams SQL & Coding
router.get('/medianAmountOfViewersSQL',isLoggedIn,controllers.medianAmountOfViewersSQL);
router.get('/medianAmountOfViewersCoding',isLoggedIn,controllers.medianAmountOfViewersCoding);

// Get Streams with odd number of views SQL & Coding
router.get('/oddViewersStreamSQL',isLoggedIn,controllers.oddViewersStreamSQL);
router.get('/oddViewersStreamCoding',isLoggedIn,controllers.oddViewersStreamCoding);

// Get Streams with even number of views SQL & Coding
router.get('/evenViewersStreamSQL',isLoggedIn,controllers.evenViewersStreamSQL);
router.get('/evenViewersStreamCoding',isLoggedIn,controllers.evenViewersStreamCoding);

// Get Top 100 streams SQL & Coding
router.get('/topStreamsSQL',isLoggedIn,controllers.topStreamsSQL);
router.get('/topStreamsCoding',isLoggedIn,controllers.topStreamsCoding);

// Get Streams with same number of viewers SQL & Coding
router.get('/streamsWithSameViewersSQL',isLoggedIn,controllers.streamsWithSameViewersSQL);
router.get('/streamsWithSameViewersCoding',isLoggedIn,controllers.streamsWithSameViewersCoding);


export default router ;