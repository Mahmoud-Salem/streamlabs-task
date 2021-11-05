/* eslint-disable */

import dotenv from 'dotenv';
dotenv.config();

const config = {
    TWITCH_CLIENT_ID : process.env.TWITCH_CLIENT_ID,
    JWT_SECRET       : process.env.SESSION_SECRET,
    TWITCH_TOKEN     : process.env.TWITCH_TOKEN,
    TWITCH_AUTH      : process.env.TWITCH_AUTH,
    TWITCT_STREAMS   : process.env.TWITCT_STREAMS
};

export default config;