/* **************
The only purpose of this script is to be used by the npm test script to 
write the shield badge within the README.md file
************** */ 

var fs = require('fs');
var path = require('path');
var istanbul = require('istanbul');
var shieldBadgeReporter = require('istanbul-reporter-shield-badge');

const generateShieldBadge = () => {
  return new Promise((resolve, reject) => {
    console.log('Generating code coverage shield badge...');
    var collector = new istanbul.Collector();
    var Report = istanbul.Report;
    istanbul.Report.register(shieldBadgeReporter);
    var report = Report.create('shield-badge', {
      readmeFilename: 'README.md',
      readmeDir: path.resolve(__dirname, '..'),
      subject: 'Test Coverage',
      range: [60, 90]
    });

    try {
      var coverageDir = path.resolve(__dirname, '..', 'spec', 'coverage');
      fs.readdirSync(coverageDir).forEach(function (file) {
        if (file.indexOf('cov') === 0 && file.indexOf('.json') > 0) {
          collector.add(JSON.parse(fs.readFileSync(
            path.resolve(coverageDir, file), 'utf8')));
        }
      });
      report.on('done', function () { 
        // console.log('Code coverage shield badge generated.')
      });

      // TODO: add this back in when the complete event is available
      // report.on('complete', function() {
      //   resolve();
      // });
      report.writeReport(collector, true);

      // TODO: remove this once we have the complete event available
      resolve();
    } catch (err) {
      console.error(err.message);
      reject(err);
    }
  });
};




module.exports = generateShieldBadge;