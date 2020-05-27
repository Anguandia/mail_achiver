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
searchValue = document.querySelector('input'),
srchTxt = document.getElementById('srch-txt'),
searchField = document.querySelector('#calendar'),
listHead = ['From', 'To', '', 'Subject', '', 'Date'],
tallyFields = ['subject', 'attachment', 'date', 'body'],
blue = 'invert(0) sepia(1) saturate(15) hue-rotate(180deg)',
months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
sortArrowIcon = '<img src="files/icon_arrow01.svg" alt="" >',
nextArrowIcon = `<img src='files/icon_arrow02.svg' class='small arrow'>`;


// set state for history/back-foward navigation
function saveStateToHistoryStack() {
  state.body = body.innerHTML;
  state.caption = count.innerHTML;
  state.head = head.innerHTML;
  state.logo = '';
  window.history.pushState(state, null, '');
}

function getDateString(index=body.children.length) {
  return body.children[index].children[5].innerText;
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

let ascSort = screen.width > 620
  ? [0, 0, 0, 0, 0, 1]
  : [1, 0, 0, 0, 0, 0];

function sortByDate(arr, ascending) {
  arr.sort((a, b) => (timeStamp(a.date[0]) - timeStamp(b.date[0])));
  return ascending ? arr.reverse(): arr;
}

function sortStringField(array, fieldIndex, ascending) {
  const fieldValue = (f) => [].concat(f).join().replace(/[^\w\s]/gi, '')
    .toLocaleLowerCase();
  let ar = array.map((e) => fieldValue(e[fields[fieldIndex]]));
  ar.sort();
  ar = ar.map((e) => array.find((d) => fieldValue(d[fields[fieldIndex]]) === e));
  return ascending ? ar: ar.reverse();
}

function sortFunctionSelector(array, sortByIndex=5) {
  return sortByIndex === 5
  ? sortByDate(array, ascSort[5])
  : sortStringField(array, sortByIndex, ascSort[sortByIndex]);
}

function sortBy(fieldIndex) {
  let newIndex = fieldIndex === 2
  ? 1: fieldIndex ===  4
  ? 3: fieldIndex;
  const headFields = Array.from(document.querySelectorAll('.th'));
  const arrow = headFields[newIndex].firstElementChild.firstElementChild;
  headFields.forEach((f) => f.firstElementChild.style.display = 'none')
  headFields[newIndex].firstElementChild.style.display = 'inline';
  arrow.style.transform = `rotate(${ascSort[newIndex] * 180}deg)`;
  ascSort[newIndex] = !ascSort[newIndex];
  buildBody(MAILS, 'tr', newIndex);
}

const sortHandlers = Array(6).fill(0).map((e, i) => () => sortBy(i))

function searchBy() {
  const searchValue = document.querySelector('input').value.toLocaleLowerCase();
  let fromTime, toTime;
  if(searchCounter === 5) {
    [fromTime, toTime] = searchValue.split(' - ').map((d) => timeStamp(d));
    toTime = toTime || (new Date()).getTime()
    return (x) => fromTime <= timeStamp(x.children[5].innerText.split(': ')[1])
      <= toTime;
  }
  return (x) => x.children[searchCounter].innerText.split('@')[0]
    .toLocaleLowerCase().search(searchValue.toLocaleLowerCase()) !== -1;
}

let searchCounter = screen.width > 620 ? 5: 0;

function searchMail() {
  const display = screen.width > 620 ? 'flex': 'table';
  let unfiltered = Array.from(body.children);
  unfiltered.forEach((mail) => mail.style.display = 'none');
  unfiltered = unfiltered.filter(searchBy());
  unfiltered.forEach((mail) => mail.style.display = display);
}

const icons = [
  nextArrowIcon, nextArrowIcon, null, '<span>abc</span>', null,
  '<img src="files/icon_calender.svg" alt="">'
];

const searchKeys = ['sender email', 'reciever email', '', 'subject', '', 'date'];

function setDefaultSearchValue() {
  if(searchCounter === 5 && body.children.length) {
    searchValue.value = `${getDateString(9)} - ${shortDate(new Date())}`;
  }
  searchValue.setAttribute('placeholder', `Enter ${searchKeys[searchCounter]}`);
}

function setSearchField() {
  switch(searchCounter) {
    case 5:
      searchCounter = 0;
      break;
    case 1:
    case 3:
      searchCounter += 2;
      break;
    default:
      searchCounter++
  }
  searchField.innerHTML = icons[searchCounter];
  if(searchCounter === 1) {
    searchField.querySelector('img').style.transform = 'rotate(180deg)';
  }
  setDefaultSearchValue();
}

function showSearchTip() {
  const searchTip = document.querySelector('#search-tip');
  searchTip.style.display = 'block';
}


const shortDate = (time) => `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`;

// dislay the time in the specified formats: hh:mm. moth dd or yyyy/mm/dd
function formatTime(inp) {
  const time = typeof inp === 'object' ? inp: new Date(inp);
  const today = new Date();
  if (time.getDate() === today.getDate()) {
    return `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
  } else if (time.getFullYear() === today.getFullYear()) {
    return `${months[time.getMonth()]} ${time.getDate()}`;
  } else {
    return shortDate(time);
  }
}

function appendNextIcon(talliedMails) {
  return talliedMails.map(e => e = Object.assign(e, {
    date: formatTime(e.date[0]) + nextArrowIcon
  }));
}

function fillEmailFields(email) {
  return fields.map(cell => {
    let c = createElt(`td _${cell}`);
    const label = createElt('label', `${cell}: `, '', 'b');
    let data = email[cell];
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
    </span><span style=\'font-size:75%\'>+${email.threads -1}</span>`: '';
}

function showReadMultipleTip() { // for mobile view
  message.style.visibility = 'visible';
  setTimeout(() => message.style.visibility = 'hidden', 4000);
}

function displayAttachmentIcon(email, att, date) {
  att.innerHTML = email.attachment.length
    ? `<img src='files/icon_clip.svg' alt='photo.png' />`: '';
  att.style.marginRight = `${date.innerHTML.split('<')[2].length}ch`;
} 

function attachMailIcon() { //mail icon for small screens only
    const img = createElt('td');
    img.innerHTML =
    `<img src='files/icon_mail_sp.svg' class='small mail' id='mail'>`;
    return img;
}

// give the clip svg icon the blue coor on selection
function iconColor() {
  const icons = this.getElementsByTagName('img');
  showTooltip(this); // show multiple message tip fo large screens
  Array.prototype.forEach.call(icons, (i) => {
    i.style.filter = !i.style.filter ? blue: '';
  });
}

const assignListener = (elt, event, fn) => elt.addEventListener(event, fn);

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
}

function formatHead() {
  const headFields = Array.from(document.querySelectorAll('.th'));
  clear(body, logo);
  headFields.forEach((f, i) => f.innerHTML +=
  ` <span id='sort-${listHead[i].toLowerCase()}'>${sortArrowIcon}</span>`)
  head.style.visibility = 'visible';
}

// filter emails to get tally of emails between same sender and reciepient(s)
function tallyMails(rawData, uniqueCorrespondentsSet, sortByIndex) {
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
  return sortFunctionSelector(talliedMails, sortByIndex);
}

function checkMulipleMailsBetweenSameUsers(allMail, sortByIndex) {
  const userArr = allMail.map((m) => m.from + ',' + m.to.join('%'));
  const unique = new Set(userArr);
  if(unique.size > 1) {
    return tallyMails(allMail, unique, sortByIndex);
  }
  allMail.forEach((e) => tallyFields.forEach((f) => e[f] = [].concat(e[f])));
  return sortFunctionSelector(allMail, sortByIndex);
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

function searchPageEventHandlers(tr) {
  const row = Array.from(tr.children);
  const events = ['mouseover', 'mouseout'];
  const handlers = [iconColor, iconColor];
  row[2].addEventListener('click', () => openMail(tr), false);
  events.forEach((v, i) => assignListener(tr, v, handlers[i]));
  row.splice(2, 1)
  row.forEach((e) => assignListener(e, 'click', () => openSelection(tr)));
}

function sortBarEventHandlers() {
  const sortElements = Array.from(document.querySelectorAll('.th'));
  sortElements.forEach((h, i) => assignListener(h, 'click', () => sortBy(i)));
}

function buildBody(mails, rowClass='tr', fieldIndex=screen.width > 620 ? 5: 0) {
  clear(body);
  let arr = checkMulipleMailsBetweenSameUsers(mails, fieldIndex);
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
    _body.setAttribute('class', 'body _body'); // identify the email body for hidding
    _body.style.display = rowClass === 'tr' ? 'none': 'block';
    searchPageEventHandlers(tr);
    return tr;  
  });
  arr.forEach(e => attachChild(body, e));
}

// core function to build list of all emails
function createMailList(allMail, rowClass='tr') {
  createHead(listHead, 'th', '', sortHandlers);
  formatHead();
  buildBody(allMail, rowClass);
  setDefaultSearchValue();
  searchField.innerHTML = icons[searchCounter];
  count.innerHTML = document.querySelectorAll(`.${rowClass}`).length - 1;
  saveStateToHistoryStack();
}

// set the default search criteia icon on load
window.onload = () => {
  searchField.innerHTML = icons[searchCounter];
  setDefaultSearchValue();
}

const loadSearch = () => {
  createMailList(MAILS);
  showReadMultipleTip();
  if(searchValue.value) {
    searchMail();
  }
}

function resetListeners() {
  const emails = Array.from(body.children);
  if(emails.length) {
    emails.forEach((email) => searchPageEventHandlers(email));
  }
  sortBarEventHandlers();
}

