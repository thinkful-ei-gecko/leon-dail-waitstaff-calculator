'use strict';

const database = {
  tipTotal : 0,
  mealCount : 0,
  averageTip : 0
};

function startPage() {
  loadEmptySubmitForm();
  loadEmptyCustomerCharges();
  loadEmptyEarningsInfo();
}

function loadEmptySubmitForm() {
  $('#submit-form').html(`
  <div class="submit-flex">
                    <div class="row">
                        <label for="base-meal-price" class="">Base Meal Price: </label>
                        <span> $ <input type="text" class="long-input" id="base-meal-price"></span>
                    </div>
                    <div class="row">
                        <label for="tax-rate" class="">Tax Rate:</label>
                        <span>% <input type="text" class="short-input" id="tax-rate"></span>
                    </div>
                    <div class="row">
                        <label for="tip-percentage" class="">Tip Percentage:</label>
                        <span>% <input type="text" class="short-input" id="tip-percentage"></span>
                    </div>
                </div>
                <div class="row">
                    <button class="submit-data" type="submit">Submit</button>
                    <button class="clear-data">Clear</button>
                </div>
                <div class="display-error"></div>`);
}

function loadEmptyCustomerCharges() {
  $('#customer-charges-info').html(`
  <div class="charges-box">
      <p id="subtotal">Subtotal <span id="subtotal-number">0</span></p>
      <p id="tip">Tip <span id="tip-number">0</span></p>
      <p id="total">Total <span id="total-number">0</span></p>
  </div>`);
}

function loadEmptyEarningsInfo() {
  $('#earnings-box-info').html(`
  <p id="tip-total">Tip Total <span id="tip-total-number">0</span></p>
  <p id="meal-count">Meal count <span id="meal-count-number">0</span></p>
  <p id="average-tip">Average tip per meal <span id="average-tip-number">0</span></p>`);
}
function addToEarningsInfo() {
  let subtotal = parseInt($('#base-meal-price').val(),10);
  let taxtotal = parseInt($('#tax-rate').val(),10);
  let tiptotal = parseInt($('#tip-percentage').val(),10);
  let subtotalNumber = subtotal + (subtotal * (taxtotal/100));
  let tipNumber = subtotal * (tiptotal/100);

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
}

function pushData() {
  addToCustomerCharges();
  addToEarningsInfo();

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
    let current = $(document.activeElement).attr('class');
    if (current === 'submit-data') {
      let datacheck = checkSubmissionData();
      if (datacheck) {
        pushData();
      }
    }
    else { loadEmptySubmitForm(); }
  });
}

function resetPage() {
  $('#reset-form').submit(e => {
    e.preventDefault();
    database.tipTotal = 0;
    database.mealCount = 0;
    database.averageTip = 0;
    loadEmptySubmitForm();
    loadEmptyCustomerCharges();
    loadEmptyEarningsInfo();
  })
}

function listener() {
  startPage();
  submitForm();
  resetPage();
}

$(listener);