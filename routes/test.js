var RecordWt = require('../models/recordwt');

module.exports = function(app) {
    
   app.get('/setuprecwt', function(req, res) {
       
       // seed database
       var starterEntries = [
           {
               pid: 'test',
               Date: Date.now,
               weight: '160.5'
           },
           {
            pid: 'test',
            Date: Date.now,
            weight: '175.5'
        },
        {
            pid: 'test',
            Date: Date.now,
            weight: '125.5'
        },
       ];
       RecordWt.create(starterEntries, function(err, results) {
           res.send(results);
       }); 
   });
}