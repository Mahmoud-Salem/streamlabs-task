// Controller model to execute all functions
import cron from 'node-cron';
import prisma from '../database.js';
import seedDB from './seedDB.js';

// cron job every 15 minutes to renew database.
cron.schedule('0 */15 * * * *',seedDB);

const controllers =
{
    // get all streams and sets a dictionary of categories to its number of streams
    totalAmountOfStreamsCoding: async (req,res)=>{
        const result = await prisma.stream.findMany({});
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        var games = {};
        result.forEach(stream => {
            if(games[stream.game])
                games[stream.game]++;
            else 
                games[stream.game]= 1 ;
        });
        res.status(200).json({games:games});
    },

    // SQL query to find count of rows that has same game
    totalAmountOfStreamsSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT game, COUNT(*) FROM "Stream" GROUP BY game`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        var games = {};
        result.forEach(element => {
            if(element.game)
                games[element.game] = element.count ;
        });
        res.status(200).json({games:games});
    },

    // SQL query to find highest stream grouped by game/categories
    highestViewerPerGameSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT game, viewers, "channelName" FROM "Stream" WHERE (game,viewers) IN (SELECT game,MAX(viewers) FROM "Stream" GROUP BY game)`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        var games = {};
        result.forEach(element => {
            if(element.game)
                games[element.game] = {channel : element.channelName, viewers : element.viewers} ;
        });
        res.status(200).json({games:games});
    },

    // get all streams and loop over if to set a dictionary with keys as games and value as highest viewer stream
    highestViewerPerGameCoding: async (req,res)=>{
        const result = await prisma.stream.findMany({});
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        var games = {};
        result.forEach(element => {
            if(element.game){
                if(!games[element.game]){
                    games[element.game] =  {channel : element.channelName, viewers : element.viewers};
                }else if(games[element.game].viewers < element.viewers){
                    games[element.game] = {channel: element.channelName, viewers : element.viewers};
                }
            }
        });
        res.status(200).json({games:games});
    },

    // percentile_disc(0.5) to get the median of viewers for all streams
    medianAmountOfViewersSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT percentile_disc(0.5) WITHIN GROUP(ORDER BY viewers) FROM "Stream"`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        var median = result[0].percentile_disc;
        res.status(200).json({median:median});
    },

    // get all streams, sort them and find the median (even numbers or odd numbers) which is median
    medianAmountOfViewersCoding: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT viewers FROM "Stream"`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        result.sort(function(a,b){
            return a.viewers - b.viewers ;
        });
        var median =0 ;
        if(result.length%2===0)
        {
            var temp1 = result[Math.floor(result.length/2)].viewers ;
            var temp2 = result[Math.floor(result.length/2)+1].viewers;
            median = (temp1 + temp2)/2 ;
        }else {
            median = result[Math.floor(result.length/2)].viewers;
        }
        res.status(200).json({median:median});
    },

    // SQL query which has odd number of viewers.
    oddViewersStreamSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT game, viewers, "channelName" FROM "Stream" WHERE viewers % 2 = 1`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        var games = {};
        result.forEach(element => {
            if(element.game){
                games[element.game] = {channel : element.channelName , viewers : element.viewers};
            }
        });
        res.status(200).json({games:games});
    },

    // get all streams and filter then as %2==1 which is odd viewers count
    oddViewersStreamCoding: async (req,res)=>{
        const result = await prisma.stream.findMany({});
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        var games = {};
        result.forEach(element => {
            if(element.game && element.viewers%2===1){
                games[element.game] = {channel : element.channelName , viewers : element.viewers};
            }
        });
        res.status(200).json({games:games});
    },

    // SQL query which has even number of viewers.
    evenViewersStreamSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT game, viewers, "channelName" FROM "Stream" WHERE viewers % 2 = 0`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        var games = {};
        result.forEach(element => {
            if(element.game){
                games[element.game] = {channel : element.channelName , viewers : element.viewers};
            }
        });
        res.status(200).json({games:games});
    },

    // get all streams and filter then as %2==0 which is even viewers count
    evenViewersStreamCoding: async (req,res)=>{
        const result = await prisma.stream.findMany({});
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        var games = {};
        result.forEach(element => {
            if(element.game && element.viewers%2===0){
                games[element.game] = {channel : element.channelName , viewers : element.viewers};
            }
        });
        res.status(200).json({games:games});
    },

    // SQL query to order streams descendingly and get first 100 
    topStreamsSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT game, viewers, "channelName" FROM "Stream" ORDER BY viewers DESC LIMIT 100`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        var games = [];
        
        result.forEach(element => {
            var temp = {game : element.game, channel: element.channelName, viewers : element.viewers}
            games.push(temp);
        });
        res.status(200).json({games:games});
    },

    // get all streams sort them descendingly and get the first 100
    topStreamsCoding: async (req,res)=>{
        const result = await prisma.stream.findMany({});
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        result.sort(function(a,b){
            return b.viewers - a.viewers ;
        });
        var top_100 = result.slice(0,100);
        var games = [];
        top_100.forEach(element => {
            var temp = {game : element.game, channel: element.channelName, viewers : element.viewers}
            games.push(temp);
        });
        res.status(200).json({games:games});
    },

    // SQL query to get all rows which has duplicates then group them into a list with the number of viewers as key.
    streamsWithSameViewersSQL: async (req,res)=>{
        const result = await prisma.$queryRaw`SELECT game, viewers, "channelName" FROM "Stream" s WHERE s.viewers IN (SELECT viewers FROM "Stream" s2 WHERE s.id != s2.id)`;
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        result.sort(function(a,b){
            return b.viewers - a.viewers ;
        });
        var games = {};
        result.forEach(element => {
            var temp = {channel: element.channelName}
            if(games[element.viewers])
            {
                games[element.viewers].push(temp);
            }else {
                games[element.viewers] = [] ;
                games[element.viewers].push(temp);
            }
        });
        res.status(200).json({games:games});
    },

    // get all streams, generate a dictionary that has number of viewers as keys and list of streams as values 
    streamsWithSameViewersCoding: async (req,res)=>{
        const result = await prisma.stream.findMany({});
        if(result.length ===0)
            res.status(404).json({message:'No results found !!'});
        
        var games = {};
        for(var i =0 ;i<result.length;i++)
        {
            var temp = {channel: result[i].channelName}
            if(games[ result[i].viewers])
            {
                games[ result[i].viewers].push(temp);
            }else {
                games[ result[i].viewers] = [] ;
                games[ result[i].viewers].push(temp);
            }
        }
        for (const key in games) {

            if(games[key].length < 2)
                delete games[key];
        }
        res.status(200).json({games:games});
    },

}

export default controllers;