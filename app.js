// Listen for submit event of form
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// calculate result function
function calculateResults(e) {
  // Preventing Default behavior of form submit
  e.preventDefault();

  // UI variables
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');
  const submitBtn = document.getElementById('submit');
  const resultsDiv = document.querySelector('.results');
  const loadingDiv = document.querySelector('.loading');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Calculate monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

    loadingDiv.style.display = 'block';
    submitBtn.value = 'Calculating...';
    amount.value = interest.value = years.value = '';

    setTimeout(() => {
      loadingDiv.style.display = 'none';
      submitBtn.value = 'Calculate';
      resultsDiv.style.display = 'block';
    }, 1000);
  } else {
    showError('Please Check your Inputs');
  }
}

// Show Error function
function showError(err) {
  let errDiv = document.createElement('div');
  errDiv.className = 'alert alert-danger';
  errDiv.textContent = err;

  document.getElementById('loan-form').insertAdjacentElement('beforebegin', errDiv);

  setTimeout(() => {
    document.querySelector('div.alert').remove();
  }, 2000);
}