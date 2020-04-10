#!/usr/bin/env node

const fs = require('fs');
// const util = require('util');
const path = require('path');
const chalk = require('chalk');
const targetDir = process.argv[2] || process.cwd();
// console.log(chalk.yellow());

fs.readdir(targetDir, async (err, data) => {
	if (err) throw new Error(err);

	const statPromises = data.map((filename) => lstat(path.join(targetDir, filename)));
	const allStats = await Promise.all(statPromises);
	// console.log();
	for (let stats of allStats) {
		// get the index of stats using indexOf
		const index = allStats.indexOf(stats);
		// use the previous index on data array to get that same value
		stats.isFile() ? console.log(data[index]) : console.log(chalk.green(data[index]));
	}
});

// Method 1 , manual promises
// const lstat = (file) => {
// 	return new Promise((resolve, reject) => {
// 		fs.lstat(file, (err, filestat) => {
// 			if (err) reject(err);
// 			// console.log(file, filestat.isFile());
// 			resolve(filestat.isFile());
// 		});
// 	});
// };

// Method 2, Using built in utils.promisify ,
// Takes a function following the common error-first callback style,
//i.e. taking an (err, value) => ... callback as the last argument,
//and returns a version that returns promises.

// const lstat = util.promisify(fs.stat);

// Method 3

const { lstat } = fs.promises;
