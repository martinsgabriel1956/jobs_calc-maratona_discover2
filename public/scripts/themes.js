const elements = {
  btn: document.getElementById('switch'),
  body: document.querySelector('body'),
} 

elements.btn.addEventListener('change', ({ target }) => {
  localStorage.setItem('darkmode', target.checked)
  if(target.checked) {
    elements.body.classList.add('darkmode');
    localStorage.getItem('darkmode');
  } else {
    elements.body.classList.remove('darkmode');
  }
});
