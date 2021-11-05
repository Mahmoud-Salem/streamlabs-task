import axios from 'axios';
import config from '../config.js';
import prisma from '../database.js';


// Seed database with top 1000 streams
const seedDB = async () => {

    // offset to get paginatio to maxmimum of 1000 with 100 on each request
    const maxOffset = 900 ;
    var responseStream = [] ;
    var cursor = '';
    for(var offset =0 ;offset<maxOffset;offset+=100)
    {
        // cursor for pagination
        var twitchURL = config.TWITCT_STREAMS+cursor;
        // request to twitch api to get 100 streams
        const result = await axios.get(twitchURL,{
            method :'get',
            headers:{
                'Client-ID' : config.TWITCH_CLIENT_ID,
                'Authorization': 'Bearer '+config.TWITCH_TOKEN 
            }
        });
        // for each 100 get values and push to array
        result.data.data.forEach(current =>{
            var stream = {
                game : current.game_name,
                viewers : current.viewer_count,
                channelName : current.user_login,
            }
            responseStream.push(stream);
        });
        // check if there is another page if not break ( streams < 1000)
        if(result.data.pagination.cursor !== undefined)
            cursor = '&after='+result.data.pagination.cursor ;
        else   
            break ;
    }
    // call shuffle function written below to shuffle streams
    shuffle(responseStream);
    var promises = [] ;

    // delete old records and push new records to the database (promise).
    prisma.stream.deleteMany({}).then(res=>{
        responseStream.forEach(stream => {
            promises.push(prisma.stream.create({data:stream}));
        });

        Promise.all(promises).then(res=> console.log('DB updated !!')).catch(err => console.log(err)); 
    })
};

// shuffle function based on Fisher-Yates (aka Knuth)
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


export default seedDB;