const cluster = require('cluster');
const os = require('os');

if(cluster.isMaster) {
  var noWorkers = os.cpus().length;
  console.log(`machine has ${noWorkers} cpus`);
  for(let i=0; i<noWorkers; i++) {
    cluster.fork();
  }
  cluster.on('online',(worker) => {
    console.log(`worker started with pid --> ${worker.process.pid}`);

  });
  cluster.on('exit',(worker,code,signal) => {
    console.log(`worker with pid ${worker.process.pid} exited` );
    console.log(`starting a new forked cluster`);
    cluster.fork();
  });
}
else {
  require('./index.js');
}
