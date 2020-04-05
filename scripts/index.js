const childProcess = require("child_process");
const argv = require("minimist")(process.argv.slice(2));
const { forks = 1 } = argv;

for (let i = 0; i < forks; i++) {
  childProcess.fork(__dirname + "/worker.js", process.argv);
}
