module.exports = function toReadable (number) {
    const result = [];

    const unitsTo20 = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const dozenTo100 = [ '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    const convertUnits = (n) => result.push(unitsTo20[n]);
    const convertTens = (n) => {
        if (n % 10 === 0) {
            if(n === 10) {
                convertUnits(n)
            } else {
                result.push(dozenTo100[n/10]);
            }
        } else {
            if (n < 20) {
                convertUnits(n);
            } else {
                result.push(dozenTo100[Math.floor(n / 10)]);
                convertUnits(n % 10);
            }
        }
    };
    const convertHundred = (n) => {
        if (n % 100 === 0) {
            result.push(`${unitsTo20[n / 100]} hundred`);
        } else {
            result.push(`${unitsTo20[Math.floor(n / 100)]} hundred`);
            convertTens(n % 100);
        }
    }

   if (number < 20) {
       if (number === 0) {
           return 'zero';
       } else {
           convertUnits(number);
       }

   } else if (number >= 20 && number < 100) {
       convertTens(number);

   } else if (number >= 100 && number < 1000) {
       convertHundred(number);
   }
    return result.join(' ');
}
