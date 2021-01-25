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
        <div>
        <h3>${description}</h3>
        <div class="frow">
          <i class="fas fa-plus" data-func="add-res"></i>
          <i class="fas fa-trash-alt" data-func="delete"></i>
          <i class="fas fa-table" data-func="reservations"></i>
        </div>
        </div>
        <div class="time">Starting...</div>
      </div>
      <div class="add-card frow-dis">
          <div class="data-card">
            <div class="form-group mb-05">
              <label>New Hours</label>
              <input type="number" class="hours">
            </div>
            <div class="form-group">
              <label>New Minutes</label>
              <input type="number" class="minutes">
            </div>
          </div>
          <div class="frow">
            <button class="btn bg mr-1" data-func="start-new">Start</button>
            <button class="btn" data-func="cancel-res">Cancel</button>
          </div>
      </div>
    `;
    this.delta = hrs * 3600000 + mins * 60000;
    this.reservations = [];
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
    ).textContent = `${timeToShow.getUTCHours()}:${timeToShow.getUTCMinutes()}:${timeToShow.getUTCSeconds()}`;
  }

  startNew(newHours, newMins){
    const now = new Date().getTime();
    const timePassed = new Date(now - this.started);
    this.reservations.push(`${timePassed.getUTCHours()}:${timePassed.getUTCMinutes()}:${timePassed.getUTCSeconds()}`)
    this.delta = newHours * 3600000 + newMins * 60000;
    this.start()
  }
}

// this is the main timer controller
const TimeCtrl = (function () {
  const timerList = new Map();
  let intervalFunc;

  // This will add the time and starts it
  function push(newTimer) {
    if (timerList.size === 0) {
      startMainTimer();
    }
    newTimer.start();
    timerList.set(newTimer.id, newTimer);
  }

  // removes the timer
  function remove(itemId) {
    timerList.delete(itemId);
    if (timerList.size === 0) {
      stopMainTimer();
    }
  }

  function startMainTimer() {
    console.log("Main timer started...");
    intervalFunc = setInterval(function () {
      const now = new Date();
      let nowTime = now.getTime();
      if (now.getMilliseconds() > 500) {
        nowTime += 1000;
      }

      for (const timer of timerList.values()) {
        timer.update(nowTime);
      }
    }, 1000);
  }

  function stopMainTimer() {
    console.log("main timer stopped...");
    clearInterval(intervalFunc);
  }

  function getTimer(timerId) {
    return timerList.get(timerId);
  }

  function logTimer() {
    console.log(timerList);
  }
  return {
    push,
    remove,
    logTimer,
    getTimer,
  };
})();
