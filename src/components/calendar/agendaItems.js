import isEmpty from 'lodash/isEmpty';

const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(0);
const futureDates = getFutureDates(6);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(numberOfDays) {
  const array = [];
  for (let index = 1; index <= numberOfDays; index++) {
    let d = Date.now();
    if (index > 8) {
      // set dates on the next month
      const newMonth = new Date(d).getMonth() + 1;
      d = new Date(d).setMonth(newMonth);
    }
    const date = new Date(d + 864e5 * index); // 864e5 == 86400000 == 24*60*60*1000
    const dateString = date.toISOString().split('T')[0];
    array.push(dateString);
  }
  return array;
}
function getPastDate(numberOfDays) {
  return new Date(Date.now() - 864e5 * numberOfDays).toISOString().split('T')[0];
}

export function getMarkedDates(agendaItems) {
  if (isEmpty(agendaItems)) {
    return {};
  }
  const marked = {};
  for (const item of agendaItems) {
    if( checkifAlreadyMarked(item,marked)===true){
      continue
    }
    else if (item.data && item.data.length > 0 && !isEmpty(item.data[0])) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  }
  return marked;
}

const checkifAlreadyMarked = (item,marked) => {
  if (Object.keys(marked).indexOf(item)===-1) {
    return false}
  return true
}
