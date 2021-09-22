const billInput = document.querySelector('#bill');
const tipBtn = document.querySelectorAll('.tip');
const customTipInput = document.querySelector('#custom-tip-percentage');
const numOfPeople = document.querySelector('#number-of-people');
const warningSign = document.querySelector('.warning');
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
  element.addEventListener('click', function (e) {
    tipPercentage = parseInt(element.value) / 100;
    customTipInput.value = '';
    tipBtn.forEach((btn) => {
      btn.classList.remove('selected');
    });
    this.classList.add('selected');
    customTipInput.classList.remove('selected-input');
    calcResult();
  });
});

customTipInput.addEventListener('click', (e) => {
  tipBtn.forEach((btn) => {
    btn.classList.remove('selected');
  });
});

customTipInput.addEventListener('blur', (event) => {
  if (parseInt(customTipInput.value) === 0) {
    tipPercentage = 0;
  } else {
    tipPercentage = parseInt(customTipInput.value) / 100;
  }
  customTipInput.classList.add('selected-input');
  calcResult();
});

// Get number of people
let headCount;

numOfPeople.addEventListener('blur', (event) => {
  headCount = parseInt(numOfPeople.value);
  if (headCount <= 0) {
    warningSign.classList.remove('hidden');
    numOfPeople.classList.add('warning-outline');
  } else {
    calcResult();
  }
});

// Reset input value on focus
inputs.forEach((input) => {
  input.addEventListener('focus', function (event) {
    this.value = '';
  });
});

numOfPeople.addEventListener('focus', (event) => {
  warningSign.classList.add('hidden');
  numOfPeople.classList.remove('warning-outline');
});

// Reset everything when reset button is clicked
resetBtn.addEventListener('click', (event) => {
  resetAll();
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

    resetBtn.classList.add('selected');
  }
};

// Reset all states
const resetAll = () => {
  billAmount = 0;
  tipPercentage = 0;
  headCount = 0;
  billInput.value = '';
  customTipInput.value = '';
  numOfPeople.value = '';
  tipAmountDisplay.innerHTML = '$0.00';
  totalAmountDisplay.innerHTML = '$0.00';
  warningSign.classList.add('hidden');
  numOfPeople.classList.remove('warning-outline');
  tipBtn.forEach((btn) => {
    btn.classList.remove('selected');
  });
  customTipInput.classList.remove('selected-input');
  resetBtn.classList.remove('selected');
};
