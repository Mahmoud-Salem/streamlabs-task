/* eslint-disable */
import app from './app.js' ;
import connection from './database.js' ;
import http from 'http';

// Get port from env vars.
var port = (process.env.PORT)? process.env.PORT : 8080 ;
// run server.
var server = http.createServer(app);
server.listen(port, function(err){
  if (err) console.log("Error in server setup",err)
  console.log("Server listening on Port", port);
});

server.on('listening', onListening);
server.on('error', onError);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
}


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      Process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}