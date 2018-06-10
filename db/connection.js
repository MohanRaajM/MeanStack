var mongoose = require('mongoose')
mongoose.Promise = global.Promise

const options = {
  autoIndex: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 50,
  bufferMaxEntries: 0
}

mongoose.connect('mongodb://localhost:27017/test', options)

var db_connection = mongoose.connection

db_connection.on('error', function (err) {
  console.log('db connection error ', err)
})
db_connection.once('open', function () {
  console.log('db connection opened!!');
})

exports.db_connection = db_connection
