const head = document.querySelector('#thead'),
table = document.querySelector('#table'),
body = document.querySelector('#tbody'),
logo = document.getElementById('logo-container'),
count = document.getElementById('count'),
message = document.getElementById('message');
clip = body.querySelectorAll('style'),
sender = body.getElementsByClassName('td')[0],
to = body.getElementsByClassName('td')[1],
fields = Object.keys(MAILS[0]),
srch = document.getElementById('search-icon'),
listHead = ['From', 'To', '', 'Subject', '', 'Date'],
tallyFields = ['subject', 'attachment', 'date', 'body'],
blue = 'invert(0) sepia(1) saturate(15) hue-rotate(180deg)',
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
sortArrowIcon = '<img src="files/icon_arrow01.svg" alt="">',
nextArrowIcon = `<img src='files/icon_arrow02.svg' class='small arrow'>`;


function resetListeners() {
  const emails = body.querySelectorAll('.tr');
  if(emails.length) {
    Array.prototype.forEach.call(emails, (email) => {
      ['mouseover', 'mouseout'].forEach(e => assignListener(email, e, iconColor));
      if(email.onclick === null) {
        return assignListener(email, 'click', () => openSelection(email));
      }
    });
  }
}

// set state for history/back-foward navigation
function saveStateToHistoryStack() {
  state.body = body.innerHTML;
  state.caption = count.innerHTML;
  state.head = head.innerHTML;
  state.logo = '';
  window.history.pushState(state, null, '');
}

function createElt(cls, data='', id='', type='div') {
  const el = document.createElement(type);
  el.className = cls;
  enterData(el, data);
  if(id) el.id = id;
  return el;
}

function enterData(elt, data) {
  // treat every data field as an array to include the array fields like to
  const _data = [].concat(data);
  elt.innerHTML = _data.join(', ');
}

function attachChild(parent, child) {
  parent.appendChild(child);
}

function  timeStamp(str) {
  return (new Date(str)).getTime()
}

function clear() {
  Array.prototype.forEach.call(arguments, (a) => a.innerHTML = '');
}

// sort raw data (emails) by date descending as default
function sortRaw(arr) {
  const copy = arr.filter(x => x); // make copy to preseve original array
  copy.sort((a, b) => (timeStamp(b.date[0]) - timeStamp(a.date[0])));
  return copy;
}

// dislay the time in the specified formats: hh:mm. moth dd or yyyy/mm/dd
function formatTime(inp) {
  const time = typeof inp === 'object' ? inp: new Date(inp);
  const today = new Date();
  let t;
  if (time.getDate() === today.getDate()) {
    t = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  } else if (time.getFullYear() === today.getFullYear()) {
    t = `${months[time.getMonth()]} ${time.getDate()}`;
  } else {
    t = `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate() + 1}`;
  }
  return t;
}

function appendNextIcon(talliedMails) {
  const mails = talliedMails.map(e => e = Object.assign(e, {
    date: formatTime(e.date[0]) + nextArrowIcon
  }));
  return mails;
}

function fillEmailFields(email) {
  return fields.map(cell => {
    let c = createElt(`td _${cell}`);
    const label = createElt('label', `${cell}: `, '', 'b');
    let data = email[cell];
    // data = data instanceof Array
    //   ? data.map((e) => `<b class='label'>${cell} :</b>${e}`)
    //   : `<b class='label'>${cell} :</b>${data}\n`;
    enterData(c, email[cell]);
    c.insertBefore(label, c.childNodes[0]);
    c.innerHTML += '\n'; 
    return c;
  }); 
}

function showExtraNumberWithSameCorrespondents(email, elt) {
  elt.className += ' tip';
  elt.innerHTML = email.threads > 1
      ? `<span id='tip'>Click here to view all${email.threads} mails
      </span><span style=\'font-size:75%\'>+${email.threads -1}</span>`
      : '';
}

function showReadMultipleTip() {
  message.style.visibility = 'visible';
  setTimeout(() => message.style.visibility = 'hidden', 3000);
}

function displayAttachmentIcon(email, att, date) {
  att.innerHTML = email.attachment.length
      ? `<img src='files/icon_clip.svg' alt='photo.png' />`: '';
    if (screen.width <= 620) {
      att.style.marginRight = `${date.innerHTML.split('<')[2].length}ch`;
      showReadMultipleTip(email);
    }
}

function attachMailIcon() { //mail icon for small screens only
    const img = createElt('td');
    img.innerHTML =
    `<img src='files/icon_mail_sp.svg' class='small mail' id='mail'>`;
    return img;
}

const assignListener = (elt, event, fn) => elt.addEventListener(event, fn);

// give the clip svg icon the blue coor on selection
function iconColor() {
  const icons = this.getElementsByTagName('img');
  showTooltip(this);
  Array.prototype.forEach.call(icons, (i) => {
    i.style.filter = !i.style.filter ? blue: '';
  });
}

function createHead() {
  clear(head);
  const [heads, cls, id, handlers] = arguments;
  const tr = createElt('tr', '', id);
  heads.forEach((h, i) => {
    const cell = createElt(cls, h, id ? h: '');
    if(handlers) assignListener(cell, 'click', handlers[i]);
    attachChild(tr, cell);
  });
  attachChild(head, tr);
  // formatHead();
}

function formatHead() {
  const from = document.querySelector('.th');
  const date = document.querySelectorAll('.th')[5];
  clear(body, logo);
  date.innerHTML += ` <span id='sort-date'>${sortArrowIcon}</span>`;
  head.style.visibility = 'visible';
  from.innerHTML +=  ` <span id='sort-from'>${sortArrowIcon}</span>`;
}

// filter emails to get tally of emails between same sender and reciepient(s)
function tallyMails(rawData, uniqueCorrespondentsSet) {
  const uniqueArr = [...uniqueCorrespondentsSet];
  let talliedMails = uniqueArr.map((e) => (
    {from: e.split(',')[0], to: e.split(',')[1].split('%'), threads: 0,
      subject: [], attachment: [], date: [], body: []}
  ));
  talliedMails.forEach((mail) => rawData.forEach((m) => {
    if (m.from == mail.from && m.to[0] == mail.to[0]) {
      tallyFields.forEach((f) => mail[f] = mail[f].concat(m[f]));
      mail.threads += 1;
    }
  }))
  return sortRaw(talliedMails);
}

function checkMulipleMailsBetweenSameUsers(allMail) {
  const userArr = allMail.map((m) => m.from + ',' + m.to.join('%'));
  const unique = new Set(userArr);
  if(unique.size > 1) {
    return tallyMails(allMail, unique);
  }
  allMail.forEach((e) => tallyFields.forEach((f) => e[f] = [].concat(e[f])));
  return sortRaw(allMail);
}

function showTooltip(elt) {
  const tipContainer = elt.children[2];
  const tip = tipContainer.firstChild;
  if(tip && tip.style.display === 'block') {
    tip.style.display = 'none';
  } else if(tip) {
    tip.style.display = 'block';
  }
}

// core function to build list of all emails
function createMailList(allMail, rowClass='tr') {
  createHead(listHead, 'th');
  formatHead();
  let arr = checkMulipleMailsBetweenSameUsers(allMail);
  arr = appendNextIcon(arr); 
  arr = arr.map(e => {
    const tr = createElt(rowClass);
    const cells = fillEmailFields(e);
    cells.forEach(c => attachChild(tr, c));
    attachChild(tr, attachMailIcon());
    let row = Array.from(tr.querySelectorAll('.td'));
    const [total, attachment, date, _body] = [row[2], row[4], row[5], row[6]];
    showExtraNumberWithSameCorrespondents(e, total);
    displayAttachmentIcon(e, attachment, date);
    _body.setAttribute('class', 'body _body'); // identify the email body fo hidding
    _body.style.display = rowClass === 'tr' ? 'none': 'block';
    const events = ['mouseover', 'mouseout'];
    const handlers = [iconColor, iconColor];
    total.addEventListener('click', () => openMail(tr), false);
    events.forEach((v, i) => assignListener(tr, v, handlers[i]));
    row.splice(2, 1)
    row.forEach((e) => assignListener(e, 'click', () => openSelection(tr)));
    return tr;  
  });
  arr.forEach(e => attachChild(body, e));
  count.innerHTML = document.querySelectorAll(`.${rowClass}`).length - 1;
  saveStateToHistoryStack();
}

const determinResize = () => screen.width - setInterval(() => screen.width, 50) < 0;

function adjustDateMargin() {
  const dates = Array.from(body.querySelectorAll('._date'));
  const attachments = Array.from(body.querySelectorAll('._attachment'));
  const emails = Array.from(body.querySelectorAll('.tr'));
  attachments.forEach((att, i) => {
    if(determinResize() && screen.width > 620) {
      console.log('resetting to auto');
      att.style.marginRight = '30px !important';
    }
    if(!determinResize() && screen.width <= 620) {
      displayAttachmentIcon(emails[i], att, dates[i]);
    }
  })
}

const monitorResize = () => setInterval(() => adjustDateMargin(), 100);

const stopMonitoring = () => {
  clearInterval(monitorResize)
}

window.onresize = () => setInterval(() => adjustDateMargin(), 100);

const check = () => createMailList(MAILS);