const mails = body.getElementsByClassName('td'),
actions = ['delete', 'forward', 'print'];
let date, num, iconArrow, lab, newRaw, cur, mailDetail;


function checkIfMultipleMails(target) {
  cur = target.getElementsByClassName('td');
  if(Number(cur[2].textContent.split('+')[1])) {
    return MAILS.filter((m) =>
    m.from === cur[0].textContent && m.to.join(', ') === cur[1].textContent);
  }
}

function formatMailBodyDisplay(mail) {
  iconArrow = mail.children[7];
  iconArrow.style.display = 'none'; // hide mail icon
  mail.querySelector('.body').style.display = 'initial'; // show body
  body.style.fontWeight = 'lighter';
}

function createMailBody(mail) {
  Array.prototype.forEach.call(mail.children, (c, i) => {
    c.id = fields[i];
    if(c.innerHTML.indexOf(fields[i]) === -1)
    c.innerHTML = `<b class='label'>${fields[i]}: </b> ${c.innerHTML}\n`;
  });
  mailDetail = createElt('detail');
  mailDetail.innerHTML = mail.innerHTML;
  clear(body);
  attachChild(body, mailDetail);
}

function positionMailDate() {
  num = document.getElementById('threads').textContent;
  date = document.getElementById('date');
  date.style.left = `calc(100% - ${date.textContent.split(': ')[1].length}ch)`;
  count.innerHTML = num.search(/[+]/) !== -1 ? num.split(': ')[1]: '+0';
}

function openMail(mail) {
  createHead(actions, 'action', 'actions', [deleteMail, forwardMail, () => window.print()]);
  formatMailBodyDisplay(mail);
  createMailBody(mail);
  positionMailDate();
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
  const to = document.getElementById('to');
  const from = document.getElementById('from');
  const attachment = document.getElementById('attachment');
  const subject = document.getElementById('subject');
  const _body = document.getElementById('body');
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
