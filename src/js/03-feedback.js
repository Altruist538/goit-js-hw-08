import throttle from 'lodash.throttle';
const FEEDBACK_FORM_STATE = 'feedback-form-state';
const feedbackFormEl = document.querySelector('.feedback-form');
const feedbackFormEmail = feedbackFormEl.querySelector('input');
const feedbackFormMessage = feedbackFormEl.querySelector('textarea');
let output = JSON.parse(localStorage.getItem(FEEDBACK_FORM_STATE)) || {
  email: '',
  message: '',
};
feedbackFormEmail.value = output.email;
feedbackFormMessage.value = output.message;
feedbackFormEl.addEventListener('input', throttle(setFeedbackForm, 500));
function setFeedbackForm(event) {
  output[event.target.name] = event.target.value;
  localStorage.setItem(FEEDBACK_FORM_STATE, JSON.stringify(output));
}
feedbackFormEl.addEventListener('submit', getFeedbackForm);
function getFeedbackForm(evt) {
  evt.preventDefault();
  console.log(output);
  evt.target.reset();
  output = { email: '', message: '' };
  localStorage.removeItem(FEEDBACK_FORM_STATE);
}
