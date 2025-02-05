const { namesOfDays } = require("./constants");
const { generateValuesInRange } = require("./utils/generateValuesInRange.util");

function inferCronField(cronField, min, max, accepts = []) {

    const splitFieldValues = String(cronField).split(',')
    let runsAt = [];
    const runsAtStr = new Set();


    for (let index = 0; index < splitFieldValues.length; index++) {
        const value = splitFieldValues[index];
        if (value == '?' && accepts.includes(value)) {
            if (splitFieldValues.length > 1)
                return "Invalid value"
            return "Ignored"
        }

        if (value == '*') {
            if (splitFieldValues.length > 1)
                return "Invalid value"
            const runsAtValues = generateValuesInRange(min, max, 1,  min, max)            
            runsAt = runsAt.concat(runsAtValues)
        }

        else if (value.includes('-')) {
            splitRange = value.split('-')
            const runsAtValues = generateValuesInRange(parseInt(splitRange[0]), parseInt(splitRange[1] - 1), 1, min, max)
            runsAt = runsAt.concat(runsAtValues)
        }

        else if (value.includes('/')) {
            splitValue = value.split('/')
            base = splitValue[0]
            step = splitValue[1]
            if (base == "*") {
                base = 0
            }
            else if (isNaN(base))
                return "Invalid value"
            else
                base = parseInt(base)
            step = parseInt(step)
            if (isNaN(step))
                return "Invalid value"

            const runsAtValues = generateValuesInRange(min, max, step,  min, max)
            runsAt = runsAt.concat(runsAtValues)
        }

        else if (value == 'L') {
            if (!accepts.includes(value) && splitFieldValues.length == 1) {
                return "Invalid value"
            }
            runsAtStr.add(max + "last day")
        }

        else if (value == 'W') {
            const today = new Date()

            const nextDay = new Date(today.setDate(today.getDate() + 1))

            if (nextDay.getDay() == 0) {
                runsAt.push(new Date(nextDay.setDate(nextDay.getDate() + 1)))
            } else {
                runsAt.push(nextDay.getDate())
            }
        } else if (value.includes('#')) {

            if (!accepts.includes('#')) {
                return "Invalid value"
            }

            const splitValue = value.split("#")
            const dayOfWeak = splitValue[0]
            const nthWeek = splitValue[1]

            runsAtStr.add(`weak number ${nthWeek} and ${namesOfDays[dayOfWeak]}`)
        }
        else {
            runsAt.push(parseInt(value))
        }


    }

    // return [...new Set(runsAt.sort((a, b) => (a - b))), ...runsAtStr].join(" ")
    return [...new Set(runsAt), ...runsAtStr].join(" ")

}

function inferCommand(expression, start){
    let command = ""

    for (let index = start; index < expression.length; index++) {
        const element = expression[index];
        command += " " + expression[index]
        
    }
    return command;
}


function cronParser(cronExpression, command) {
    const splitCronExpression = cronExpression.split(" ")
    console.log("minute".padEnd(15, " "), inferCronField(splitCronExpression[0], 0, 59));
    console.log("hour".padEnd(15, " "), inferCronField(splitCronExpression[1], 0, 23));
    console.log("day of month".padEnd(15, " "), inferCronField(splitCronExpression[2], 1, 31, ['L', 'W', '?']));
    console.log("month".padEnd(15, " "), inferCronField(splitCronExpression[3], 1, 12));
    console.log("day of week".padEnd(15, " "), inferCronField(splitCronExpression[4], 0, 6, ['L', '#', '?']));
    if(!isNaN(splitCronExpression[5])){
        console.log("year".padEnd(15, " "), inferCronField(splitCronExpression[5], 2000, 2010));
        console.log("command".padEnd(15, " "), inferCommand(splitCronExpression, 6));
    } else {
        console.log("command".padEnd(15, " "), inferCommand(splitCronExpression, 5));
    }
}


module.exports = {cronParser, inferCronField}