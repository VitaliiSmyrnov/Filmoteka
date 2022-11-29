const watchedBtn = document.querySelector('[data-id=watched-btn]');
const queueBtn = document.querySelector('[data-id=queue-btn]');
const watchedSet = document.querySelector('.library-buttons__wrapper');

// watchedSet.addEventListener('click', makeActiveBtn);

function makeActiveBtn(e) {
  if (e.target.classList.contains('is-active')) {
    return;
  }
  watchedBtn.classList.toggle('is-active');
  queueBtn.classList.toggle('is-active');
  return;
}
