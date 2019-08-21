'use strict';

const database = {};

function startPage() {
  database.tipTotal = 0;
  database.mealCount = 0;
  database.averageTip = 0;
  loadEmptySubmitForm();
  resetRightSide();
}

function loadEmptySubmitForm() {
  $('#submit-form').html(`
  <div class="submit-flex">
                    <div class="row">
                        <label for="base-meal-price">Base Meal Price: </label>
                        <span> $ <input type="text" class="long-input" id="base-meal-price"></span>
                    </div>
                    <div class="row">
                        <label for="tax-rate">Tax Rate:</label>
                        <span> % <input type="text" class="short-input" id="tax-rate"></span>
                    </div>
                    <div class="row">
                        <label for="tip-percentage">Tip Percentage:</label>
                        <span> % <input type="text" class="short-input" id="tip-percentage"></span>
                    </div>
                </div>
                <div class="row">
                    <button class="submit-data" type="submit">Submit</button>
                    <button class="clear-data">Clear</button>
                </div>
                <div class="display-error"></div>`);
}

function resetRightSide() {
  $('#customer-charges-info').html(`
  <div class="charges-box">
      <p>Subtotal <span id="subtotal-number">0</span></p>
      <p class="underline">Tip <span id="tip-number">0</span></p>
      <p>Total <span id="total-number">0</span></p>
  </div>`);
  $('#earnings-box-info').html(`
  <p>Tip Total <span id="tip-total-number">0</span></p>
  <p>Meal count <span id="meal-count-number">0</span></p>
  <p>Average tip per meal <span id="average-tip-number">0</span></p>`);
}
function addToEarningsInfo(tipNumber) {
  database.tipTotal += tipNumber;
  database.mealCount++;
  database.averageTip = database.tipTotal / database.mealCount;
  $('#tip-total-number').text(database.tipTotal);
  $('#meal-count-number').text(database.mealCount);
  $('#average-tip-number').text(database.averageTip);
}

function addToCustomerCharges() {
  let subtotal = parseInt($('#base-meal-price').val(),10);
  let taxtotal = parseInt($('#tax-rate').val(),10);
  let tiptotal = parseInt($('#tip-percentage').val(),10);
  let subtotalNumber = subtotal + (subtotal * (taxtotal/100));
  let tipNumber = subtotal * (tiptotal/100); 
  $('#subtotal-number').text(subtotalNumber);
  $('#tip-number').text(tipNumber);
  $('#total-number').text(subtotalNumber + tipNumber);
  return tipNumber;
}

function checkSubmissionData() {
  let basedata = $('#base-meal-price').val();
  let taxdata = $('#tax-rate').val();
  let tipdata = $('#tip-percentage').val();
  if ( $.isNumeric(basedata) && $.isNumeric(taxdata) && $.isNumeric(tipdata)) {
    $('.display-error').text('');
    return true;
  }
  $('.display-error').text('Please enter a valid number in the form');
}

function submitForm() {
  $('#submit-form').submit(e => {
    e.preventDefault();
    let currentClass = $(document.activeElement).attr('class');
    if (currentClass === 'submit-data') {
      if (checkSubmissionData()) {
        addToEarningsInfo(addToCustomerCharges());
      }
    }
    else { loadEmptySubmitForm(); }
  });
}

function resetPage() {
  $('#reset-form').submit(e => {
    e.preventDefault();
    startPage();
  })
}

function listener() {
  startPage();
  submitForm();
  resetPage();
}

$(listener);