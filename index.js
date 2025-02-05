const { cronParser } = require("./cornParser")

function index() {
    // To extract number from string
    const args = process.argv

    if (args.length !== 3) {
        console.log("Invalid command");
        return
    }
    // infer cron fields
    cronParser(args[2])
}
index()

module.exports =  index 