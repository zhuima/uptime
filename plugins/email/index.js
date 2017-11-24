/**
 * Email plugin
 *
 * Notifies all events (up, down, paused, restarted) by email
 *
 * Installation
 * ------------
 * This plugin is disabled by default. To enable it, add its entry 
 * to the `plugins` key of the configuration:
 *
 *   // in config/production.yaml
 *   plugins:
 *     - ./plugins/email
 *
 * Usage
 * -----
 * This plugin sends an email each time a check is started, goes down, or goes back up. 
 * When the check goes down, the email contains the error details:
 *
 *   Object: [Down] Check "FooBar" just went down
 *   On Thursday, September 4th 1986 8:30 PM,
 *   a test on URL "http://foobar.com" failed with the following error:
 *
 *     Error 500
 *
 *   Uptime won't send anymore emails about this check until it goes back up.
 *   ---------------------------------------------------------------------
 *   This is an automated email sent from Uptime. Please don't reply to it.
 *
 * Configuration
 * -------------
 * Here is an example configuration:
 *
 *   // in config/production.yaml
 *   email:
 *     method:      SMTP  # possible methods are SMTP, SES, or Sendmail
 *     transport:         # see https://github.com/andris9/nodemailer for transport options
 *       service:   Gmail
 *       auth:            
 *         user:    foobar@gmail.com
 *         pass:    gursikso
 *     event:
 *       up:        true
 *       down:      true
 *       paused:    false
 *       restarted: false
 *     message:           
 *       from:     'Fred Foo <foo@blurdybloop.com>'
 *       to:       'bar@blurdybloop.com, baz@blurdybloop.com'
 *     # The email plugin also uses the main `url` param for hyperlinks in the sent emails
 */
var CheckEvent = require('../../models/checkEvent');
var exec = require('child_process').exec;

exports.initWebApp = function(options) {
  CheckEvent.on('afterInsert', function(checkEvent) {
    checkEvent.findCheck(function(err, check) {
      if (err) return console.error(err);
      var uptime_details = options.config.url + '/dashboard/checks/' + check._id;
      if (checkEvent.details) {
        var uptime_code_status = checkEvent.details;
        var _uptime_code_status = uptime_code_status.replace(/\s/g, '_');
      } else {
        var _uptime_code_status = "HTTP_status_200";
      };
      var python_script = __dirname + '/dingding_alert.py';
      var command = 'python ' + python_script + ' '  + check.name  + ' ' + checkEvent.message + ' '  + check.url + ' ' + _uptime_code_status  + ' ' + uptime_details;
      exec(command, function(err, stdout, stderr){
      if(err){
          console.log("这是错误输出" + err);
        }
      console.log("这是正确输出" + stdout);
      //console.log(typeof(checkEvent.details));
      //console.log('zhuima: Check ' + check.name + ' ' + checkEvent.message + ' ' + check.url + ' ' + options.config.url);
    });
  });
  console.log('Enabled Email notifications');
});
};
