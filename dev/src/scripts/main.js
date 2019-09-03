function component() {
  const element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack'].join(' ');

  return element;
}

function init() {
  document.getElementById('copyright-year').innerText = new Date().getFullYear();
}

window.onload = function() {
  init();
}

// document.body.appendChild(component());
