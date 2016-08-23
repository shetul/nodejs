/* module.exports = [
  {
    id: 1,
    distance: 0.1,
    date: new Date('2016-1-1')
  },
  {
    id: 2,
    distance: 0.2,
    date: new Date('2016-2-1')
  },
  {
    id: 3,
    distance: 0.3,
    date: new Date('2016-3-1')
  },
];
*/

var Sequelize = require('sequelize');
var db = require('../models/db_connection.js');

var Run = db.define('run', { date:Sequelize.DATE, distance: Sequelize.FLOAT });

db.sync();

module.exports = Run;
