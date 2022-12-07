function getZero(num) {
  if (num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function timer(timerSelector, deadline) {
  //TIMER Start
  
  //deadline = "2022-10-19T12:27:00.000Z";
  function getTimeRemaining(end) {
    const rem = Date.parse(end) - new Date(),
      days = Math.floor(rem / (1000 * 60 * 60 * 24)),
      hours = Math.floor((rem / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((rem / (1000 * 60)) % 60),
      seconds = Math.floor((rem / 1000) % 60);

    return { rem, days, hours, minutes, seconds };
  }

  function setTimer(selector, end) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timerUpdetIntervalId = setInterval(updateTimer, 1000);

    updateTimer();
    function updateTimer() {
      const remaining = getTimeRemaining(end);
      if (remaining.rem > 0) {
        days.textContent = getZero(remaining.days);
        hours.textContent = getZero(remaining.hours);
        minutes.textContent = getZero(remaining.minutes);
        seconds.textContent = getZero(remaining.seconds);
      } else {
        clearInterval(timerUpdetIntervalId);
        days.textContent =
          hours.textContent =
          minutes.textContent =
          seconds.textContent =
            "00";
      }
    }
  }
  setTimer(timerSelector, deadline);
  //TIMER End
  
}
export {getZero};
export default timer;
