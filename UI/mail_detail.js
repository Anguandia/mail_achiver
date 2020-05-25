const mails = body.getElementsByClassName('td'),
actions = ['delete', 'forward', 'print'];
let date, num, iconArrow, lab, newRaw, cur, mailDetail;


function filterMailsByFromTo(mails) {
  let filtered = MAILS.filter((m) =>
    m.from === mails[0].innerText && m.to.join(', ') === mails[1].innerText);
  return !mails[2].textContent ? [filtered[0]]: filtered
}

function checkIfMultipleMails(target) {
  cur = target.getElementsByClassName('td');
  if(cur[2].textContent) {
    return filterMailsByFromTo(cur);
  }
  return null
}

function openMail(mail) {
  createHead(actions, 'action', 'actions', [deleteMail, forwardMail, () => window.print()]);
  buildBody(filterMailsByFromTo(mail.children), 'detail');
  const labels = Array.from(document.querySelectorAll('.label'));
  labels.splice(0, 3).forEach((label) => label.style.display = 'inline');
  num = mail.getElementsByClassName('_threads')[0];
  num = num.innerHTML ? Number(num.childNodes[1].innerText) + 1: 1;
  count.innerHTML = num;
  saveStateToHistoryStack();
}

function printMail() {
  window.print();
}

function deleteMail() {
  const dialogue = createElt('delete', '', 'del');
  const options = ['confirm', 'cancel'];
  const listeners = [deleted, canceled]
  options.forEach((option, i) => {
    const opt = createElt('options', option, option);
    assignListener(opt, 'click', listeners[i]);
    attachChild(dialogue, opt);
  })
  attachChild(body, dialogue);
}

function forwardMail() {
  const detail = document.querySelector('.detail');
  const [from, to, num, subject, attachment, date, _body] = detail.children;
  window.open(`mailto:?subject=${subject.textContent.substr(9)}&body=`+escape(
    `${from.textContent}${to.textContent}${date.textContent}
    ${_body.textContent.substr(6)}${attachment.innerHTML.indexOf('<img') !==
     -1 ? attachment.textContent: ''}\n`));
}

function deleted() {
  const dialogue = document.getElementById('del');
  dialogue.innerHTML = '<em>email deleted</em>'
  setTimeout(() => {
    dialogue.style.display = 'none';
    clear(head, body);
  }, 2000)
}

function canceled() {
  const dialogue = document.getElementById('del');
  dialogue.style.display = 'none';
}

function openSelection(e) {
  checkIfMultipleMails(e) ? createMailList(checkIfMultipleMails(e)): openMail(e);
}

// generate email bodies for tst data
(() => MAILS.forEach(mail => {
  mail.body = generateBody(mail.from, mail.to, mail.date);
}))()

function generateBody(s, d, t) {
  return `\n\n Hello Assessor,\n\n<br><p>This is a sample of an email sent by <em>\
  ${s.split('@')[0]}</em> to <em>${d.map(e => e.split('@')[0]).join(', ')}</em>\
  on ${t}. it does not cntain much detail but has the basics to show how a\
  typical email would look like</p>\n\n<p>I hope this is sufficient for\
  demonstation puposes<p>\n\n<p>regards <br> ${s.split('@')[0]}</p>\n\n`
}
