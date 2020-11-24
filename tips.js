// Requiring fs module in which 
// writeFile function is defined. 
const fs = require('fs') 
const tipcfg = require('./tips.json')
const execSync = require('child_process').execSync;
  
var readline = require('readline');
var cntr = 0;

var rl = readline.createInterface({
    input: fs.createReadStream('./console.tips')
});

let cmd = "NOCMD"

rl.on('line', function(line) {
  if (cntr++ >= 0) {
      const cmdline = execSync('wc -l tips.js', { encoding: 'utf-8' })
      console.log(cmdline);
      // only output lines starting with the 100th line
      console.log(`Read line ${line}`)
      let cmd = line
      cmd = cmd.toLowerCase()

      let consoledata = "ERR"
    fs.readFile('./console.tips', (err, thedata) => {
      if (err) throw err;
      consoledata = thedata
      let response
      
      if(cmd == tipcfg.prefix + "createfile"){
        console.log('command ' + cmd)
        response = "createfilecmd"
      }

      let data = consoledata + "/n" + response

      // Write data in 'console.tips' . 
      fs.writeFile('./console.tips', data, (err) => { 

          // In case of a error throw err. 
          if (err) throw err; 
      })
    });
  }
});

// import { execSync } from 'child_process';  // replace ^ if using ES modules
const output = execSync('refresh', { encoding: 'utf-8' });  // the default is 'buffer'
//this runs the 'refresh' command in the console so that you see the console change
