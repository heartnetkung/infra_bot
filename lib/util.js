const childProcess = require("child_process");
const dotenv = require("dotenv");

var verbose = process.env.VERBOSE;

exports.runCmd = (cmd) =>
	new Promise((res, rej) => {
		var cb = (err, stdout, stderr) => {
			if (err) return rej(err);
			if (stderr) return rej(stderr);
			res(stdout.trim());
		};
		var out = childProcess.exec(cmd, { cwd: __dirname }, cb);
		if (verbose) {
			out.stdout.on("data", (data) => console.log(data));
			out.stderr.on("data", (data) => console.err(data));
		}
	});

exports.log = function () {
	if (verbose) console.log.apply(null, arguments);
};

dotenv.config({});
console.log(process.env.FOO);
