export const better_round = (num, decimals) => {
  var intlen = ("" + parseInt(num)).length
  return ("" + num).slice(0,intlen+decimals+1)
}

export const format_seconds = (seconds, type) => {
  if (type === "hours") {
    return `${better_round(seconds/60/60, 1)} time${better_round(seconds/60/60, 1) == 1 ? '' : 'r'}`;
  }

  // If no formatter is specified
  if (seconds < 60) {
    return `${Math.round(seconds)} sekunder`;
  } else if (seconds < 60*60) {
    return `${better_round(seconds/60, 1)} minutter`;
  } else if (seconds < 60*60*24) {
    return `${better_round(seconds/60/60, 1)} timer`;
  }

  return `${better_round(seconds/60/60/24, 1)} dage`;
}

export const formatPhoneNumber = (number) => {
    number = number.replace(/\D/g, '');
    let formattedNumber = number.replace(/(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
    
    return formattedNumber;
}

export const format_number = (number, digits) => {
  // Convert number to string
  let numStr = number.toString();

  // Check if the number of digits is greater than the length of the number
  if (numStr.length < digits) {
    // Calculate the number of zeros to pad
    const zerosToAdd = digits - numStr.length;
    
    // Pad the number with leading zeros
    numStr = '0'.repeat(zerosToAdd) + numStr;
  }

  return numStr;
}

export const range = (start, end, step = 1) => {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}
