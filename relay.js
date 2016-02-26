'use strict';
var io = require('socket.io-client');
var gaze = require('gaze');
var fs = require('fs');
var path = require('path');
var logger = require('winston');
var config = require('./config')(logger);

var directory = path.resolve(__dirname, process.argv[2]);

if (!directory) {
  logger.error("Usage: node server.js /path/to/directory");
  process.exit(1);
}

logger.info('listening on %s', directory);

var SOCKET_IO_URL = config.server.exposed_endpoint + '/?access_token=' + config.auth.token;

logger.info('connecting...');
var sio = io(SOCKET_IO_URL, {
  transports: ['websocket', 'polling'],
  multiplex: false
});

sio.on('connect', function() {
  logger.info('connected!');
});

gaze(directory, function(err, watcher) {
  if (err) {
    throw err;
  }

  // Get all watched files
  this.watched(function(err, watched) {
    console.log(watched);
  });

  // On file changed
  this.on('changed', function(filepath) {
    sio.emit('file:changed',
      path.basename(filepath),
      Date.now(),
      fs.readFileSync(filepath, 'utf-8') // @todo use async mode
    );
      
      // Save a history of modified files
      fs.stat('Historique.txt', function (err, stats) {
        let foo = fs.readFileSync(filepath, 'utf-8');
        let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        if (err) {
            fs.writeFileSync('Historique.txt', 
                             'Modified ' + date + '\n' + 'The file ' + filepath + '\n' + foo + '\n', 
                             'utf-8');
        }else{
          fs.appendFile('Historique.txt', 
                        'Modified ' + date + '\n' + 'The file ' + filepath + '\n' + foo + '\n', 
                        0);
        }
      });
      
      fs.stat('History.json', function (err, stats) {
          let foo = fs.readFileSync(filepath, 'utf-8');
          let date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
          let json = new Object();
              json.date = date;
              json.file = filepath;
              json.content = foo;
          if(err) {
              fs.writeFileSync('History.json', JSON.stringify(json));
          }else{
              fs.appendFile('History.json', JSON.stringify(json));
          }
      });
  });
    
    /*this.on('changed', function(filepath) {
               
            fs.writeFileSync("fichierTest.txt", "kljn", 2 , 'utf-8');
        
       console.log(filepath + ' was saved in a file'); 
    });*/

  // On file added
  this.on('added', function(filepath) {
    console.log(filepath + ' was added');
  });

  // On file deleted
  this.on('deleted', function(filepath) {
    console.log(filepath + ' was deleted');
  });

  // On changed/added/deleted
  this.on('all', function(event, filepath) {
    console.log(filepath + ' was ' + event);
  });

  // Get watched files with relative paths
  this.relative(function(err, files) {
    console.log(files);
  });

});
