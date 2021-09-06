const billInput = document.querySelector('#bill');
const tipBtn = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('#custom-tip-percentage');
const numOfPeople = document.querySelector('#number-of-people');
const tipAmountDisplay = document.querySelector('.tip-amount');
const totalAmountDisplay = document.querySelector('.total-amount');
const resetBtn = document.querySelector('.reset');
const inputs = document.querySelectorAll('.input');

// Get bill amount
let billAmount;

billInput.addEventListener('blur', (event) => {
  billAmount = parseFloat(billInput.value);
  calcResult();
});

// Get tip percentage
let tipPercentage;

tipBtn.forEach((element) => {
  element.addEventListener('click', (e) => {
    tipPercentage = parseInt(element.value) / 100;
    calcResult();
  });
});

customTipInput.addEventListener('blur', (event) => {
  if (parseInt(customTipInput.value) === 0) {
    tipPercentage = 0;
  } else {
    tipPercentage = parseInt(customTipInput.value) / 100;
  }
  calcResult();
});

// Get number of people
let headCount;

numOfPeople.addEventListener('blur', (event) => {
  headCount = parseInt(numOfPeople.value);
  calcResult();
});

// Reset everything when reset button is clicked
resetBtn.addEventListener('click', (event) => {
  billAmount = 0;
  tipPercentage = 0;
  headCount = 0;
  billInput.value = '';
  customTipInput.value = '';
  numOfPeople.value = '';
  tipAmountDisplay.innerHTML = '$0.00';
  totalAmountDisplay.innerHTML = '$0.00';
});

// Reset input value on focus
inputs.forEach((input) => {
  input.addEventListener('focus', function (event) {
    this.value = '';
  });
});

// Calculate the results and display them
const calcResult = () => {
  if (billAmount && tipPercentage >= 0 && headCount) {
    let tipPerPerson = (billAmount * tipPercentage) / headCount;
    let billPerPerson = (billAmount + billAmount * tipPercentage) / headCount;
    // cent単位で切り捨て
    tipAmountDisplay.innerHTML = `$${Math.floor(tipPerPerson * 100) / 100}`;
    // cent単位で切り上げ
    totalAmountDisplay.innerHTML = `$${Math.ceil(billPerPerson * 100) / 100}`;
  }
};
