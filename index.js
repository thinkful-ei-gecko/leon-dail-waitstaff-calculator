'use strict';

function pushData() {
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