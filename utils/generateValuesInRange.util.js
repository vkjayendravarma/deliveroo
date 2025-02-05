 function generateValuesInRange(min, max, step, minAcceptRange, maxAcceptRange) {
    let values = [];    
    if (max < min) {
        for (let i = min; i <= maxAcceptRange; i += step) {
            values.push(i);
        }   
        for (let i = minAcceptRange; i <= max; i += step) {
            values.push(i);
        }   
        
        return values
    } 
    for (let i = min; i <= max; i += step) {
        values.push(i);
    }    
    return values;
}

module.exports = { generateValuesInRange }