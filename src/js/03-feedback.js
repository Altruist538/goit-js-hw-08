import throttle from 'lodash.throttle';
const inputObject = {};
const FEEDBACK_FORM_STATE = 'feedback-form-state';
const feedbackFormEl = document.querySelector('.feedback-form');
const feedbackFormEmail = feedbackFormEl.querySelector('input[name="email"]');
const feedbackFormMessage = feedbackFormEl.querySelector(
  'textarea[name="message"]'
);

feedbackFormEl.addEventListener('input', throttle(setFeedbackForm, 500));
feedbackFormEl.addEventListener('submit', getFeedbackForm);
function setFeedbackForm(event) {
  switch (event.target.name) {
    case 'email':
      inputObject['email'] = event.target.value;
      break;
    case 'message':
      inputObject['message'] = event.target.value;
      break;
    default:
      break;
  }

  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(inputObject));
}
let output = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE));

function fillingForm(object) {
  if (localStorage.getItem(FEEDBACK_FORM_STATE)) {
    feedbackFormEmail.value = object.email;
    feedbackFormMessage.value = object.message;
  }
}
fillingForm(output);
function getFeedbackForm(evt) {
  evt.preventDefault();
  console.log(output);
  feedbackFormEmail.value = '';
  feedbackFormMessage.value = '';
  output = {};
  localStorage.removeItem(FEEDBACK_FORM_STATE);
}
