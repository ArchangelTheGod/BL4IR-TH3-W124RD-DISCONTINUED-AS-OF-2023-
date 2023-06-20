const chalk = require("chalk");

module.exports = {
    name: "err",
    execute(err) {
        console.log(
            chalk.red(`An error occurred with the database connection:\m${err}`)
        );
    },
};