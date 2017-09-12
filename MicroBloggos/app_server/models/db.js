var url = 'mongodb://127.0.0.1:27017/microbloggos';
var mongoose = require('mongoose');

module.exports = {
    getDbConnectionString: function () {
        return url;
    },
    /*createDb: function () {
        mongoose.connect(url, function (err, db) {
            if (err) console.log(err);
            console.log("Database created!");
            //db.close();
        });
    }*/
}