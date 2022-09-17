(function (){
  [].slice.call(document.getElementsByTagName("a")).forEach(function (elem) {
    if (elem.classList.contains('local')) return;
    elem.rel = 'noreferrer';
    elem.addEventListener("click", function (evt) {
      if (!confirm('Leave this site?')) evt.preventDefault();
    })
  });

  const dtFormat = new Intl.DateTimeFormat(
    'en-US',
    { dateStyle: 'medium', timeStyle: 'medium' }
  );
  [].slice.call(document.getElementsByClassName("datetime")).forEach(function (elem) {
    const when = new Date(elem.innerText);
    elem.innerText = dtFormat.format(when);
  });
})();
