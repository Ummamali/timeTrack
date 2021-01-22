// This file contains classes
class TableItem {
  constructor(id, description, hrs, mins) {
    this.id = id;
    if (description === "") {
      description = `Table ${id}`;
    }
    this.description = description;
    this.elementForm = document.createElement("li");
    this.elementForm.setAttribute("data-id", id);
    this.elementForm.innerHTML = `
      <p class="number">${id}</p>
      <div class="data">
        <h3>${description}</h3>
        <div class="frow">
          <i class="fas fa-pencil-alt"></i>
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
      <div class="time"></div>
    `;
    this.delta = hrs * 3600000 + mins * 60000;
  }

  start() {
    this.started = new Date().getTime();
    this.willEnd = this.started + this.delta;
  }

  update(nowTime) {
    const remaining = this.willEnd - nowTime;
    const timeToShow = new Date(Math.abs(remaining));
    this.elementForm.querySelector(
      ".time"
    ).textContent = `${timeToShow.getUTCHours()} : ${timeToShow.getUTCMinutes()} : s${timeToShow.getUTCSeconds()}`;
  }
}

// this is the main timer controller
const TimeCtrl = (function () {
  const timerList = [];

  // This will add the time and starts it
  function push(newTimer) {
    newTimer.start();
    timerList.push(newTimer);
  }

  function startMainTimer() {
    setInterval(function () {
      const now = new Date();
      let nowTime = now.getTime();
      if (now.getMilliseconds() > 500) {
        nowTime += 1000;
      }

      for (const timer of timerList) {
        timer.update(nowTime);
      }
    }, 1000);
  }

  return {
    push,
    startMainTimer,
  };
})();
