let currentCalc = '';

function add(x, y) {
    return (x + y).toString();
}
function subtract(x, y) {
    return (x - y).toString();
}
function multiply(x, y) {
    return (x * y).toString();
}
function divide(x, y) {
    return (x / y).toString();
}
function operate(op, x, y) {
    switch (op) {
        case '+':
            return add(x, y);
        case '-':
            return subtract(x, y);
        case '*':
            return multiply(x, y);
        case '/':
            return divide(x, y);
    }
}

function onClickButton(str) {
    if (str === '=') evaluate();
    else currentCalc += str;
    document.querySelector('#current-calc').textContent = currentCalc;
    console.log(str);
}

function evaluate() {
    console.log('Evaluating: ' + currentCalc);
    const result = evalArray(tokenizer(currentCalc));
    document.querySelector('#result').textContent = result;
    currentCalc = '';
}

function isOp(str) {
    if (str === '+' || str === '-' || str === 'x' || str === '/') return true;
    return false;
}

function tokenizer(str) {
    let arr = [];
    let unparsed = str;
    while (unparsed !== '') {
        let i = 0;
        let currentStr = ''
        while (!isOp(unparsed[i]) && i < unparsed.length) {
            currentStr += unparsed[i];
            i++;
        }
        if (currentStr !== '') arr.push(currentStr);
        if (isOp(unparsed[i])) arr.push(unparsed[i]);
        unparsed = unparsed.slice(i + 1);
    }
    let newArr = Array.from(arr);
    return newArr;
}

function evalArray(arr){
    console.log(typeof arr);
    if (!Array.isArray(arr)) return arr;
    if (arr === []) return '';
    if (arr.length === 1) return arr[0];
    if (arr.length === 2) return 'ERROR';
    let result = '';
    if (!isOp(arr[0]) && isOp(arr[1]) && !isOp(arr[2])) {
        const x = parseInt(arr[0]);
        const y = parseInt(arr[2]);
        switch (arr[1]) {
            case '+':
                result = add(x, y);
                break;
            case '-':
                result = subtract(x, y);
                break;
            case 'x':
                result = multiply(x, y);
                break;
            case '/':
                if (y === 0) return 'ERROR: divide by 0';
                result = divide(x, y);
                break;
        }
    } 
    let newArr = arr.slice(3);
    newArr.unshift(result);
    console.log(newArr);
    return evalArray(newArr);
}

