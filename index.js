'use strict';

function submitMealDetails() {
  $('#submit-form').on('submit','.submit-data',e => {
    e.preventDefault();
    console.log('form submitted');
  });
}

function listener() {
  submitMealDetails();
//  clearMealDetails();
//  resetPage();
}

$(listener);