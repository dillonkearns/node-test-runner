var { parentPort } = require('worker_threads');

// Run the Elm app.
var app = Elm.Test.Generated.Main.init({ flags: Date.now() });

parentPort.on('message', function (msg) {
  app.ports.elmTestPort__receive.send(msg);
});

// Use ports for inter-process communication.
app.ports.elmTestPort__send.subscribe(function (msg) {
  parentPort.postMessage(JSON.parse(msg));
});
