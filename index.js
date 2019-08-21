'use strict';

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

function submitMealDetails() {
  $('#submit-form').submit(e => {
    e.preventDefault();
    console.log('form submitted');
    let datacheck = checkSubmissionData();
    if (datacheck) {
      pushData();
    }

  });
}

function listener() {
  submitMealDetails();
//  clearMealDetails();
//  resetPage();
}

$(listener);