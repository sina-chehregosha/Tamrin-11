const fs = require('fs');
let namesArray = [];
let numbersArray = [];
let tempArray = [];
let finalArray = [];
let resultArray = [];

fs.readFile('names.txt', 'utf8', function (err, names) {
    if (err) throw err;
    else {
        namesArray.push(names);
        // console.log(namesArray);
        namesArray = namesArray[0].split('\r\n');
        // console.log(namesArray);
        for (let i = 0; i < namesArray.length; i++) {
            namesArray[i] = namesArray[i].split('-');
        }
        // console.log(namesArray);
        namesArray = namesArray.flat(1);
        fs.readFile('numbers.txt', 'utf8', function (err, numbers) {
            if (err) throw err;
            else {
                numbersArray.push(numbers);
                // console.log(numbersArray);
                numbersArray = numbersArray[0].split('\r\n');
                // console.log(numbersArray);
                for (let n = 0; n < numbersArray.length; n++) {
                    numbersArray[n] = numbersArray[n].split('-');
                }
                // console.log(numbersArray);
                numbersArray = numbersArray.flat(1);
                // console.log(numbersArray);

                for (let i = 0; i < namesArray.length; i += 2) {
                    tempArray.push(namesArray[i + 1]); //push the name to a temporary array
                    for (let n = 0; n < numbersArray.length; n += 2) { //check the similar IDs.
                        //if there were two similar IDs, push the name and the number to a temporary array
                        if (numbersArray[n] === namesArray[i]) {
                            tempArray.push(numbersArray[i + 1]);
                        }
                    }
                    // console.log(tempArray);
                    finalArray.push(tempArray); // push tempArray to finalArray and clear the tempArray
                    tempArray = [];
                }
                console.log(finalArray);

                for (let i = 0; i < finalArray.length; i++) { // surfing throw final array and create sentenses.
                    if (finalArray[i].length > 2) {
                        //for (i=1;...)
                        //I couldn't find a way for more than two numbers :(
                        resultArray.push(`${finalArray[i][0]}'s phone numbers are ${finalArray[i][1]} and ${finalArray[i][2]}`)
                    } else if (finalArray[i].length > 1) {
                        resultArray.push(`${finalArray[i][0]}'s phone number is ${finalArray[i][1]}`)
                    } else if (finalArray[i].length = 1) {
                        resultArray.push(`${finalArray[i][0]} doesn't have any available phone number at the moment`);
                    } else {
                        console.log(`ERROR loading array`);
                    }
                }
                // console.log(resultArray);

                fs.writeFileSync('result.txt', ''); //using sync method because we need to create the final file first

                for (let i = 0; i < resultArray.length; i++) {
                    fs.appendFile('result.txt', resultArray[i] + `\n`, (err, done) => { //using arrow function because of nothing :))
                        if (err) console.log('error while appending to final file');
                        if (done) console.log('Result text file created without any problem.');
                    });
                };
            };
        });
    };
});