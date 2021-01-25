// This module contains cll the ui functionality
UiCtrl = (function () {
  // This gets hold to important DOM elements
  const DOMItems = {
    mainForm: document.getElementById("main-form"),
    numField: document.getElementById("t-number"),
    dataField: document.getElementById("t-data"),
    hrsField: document.getElementById("hours"),
    minsField: document.getElementById("minutes"),
    itemsList: document.getElementById("items-list"),
    flashContainer: document.getElementById("flash"),
    resBox: document.getElementById("res-box"),
  };

  let raisedTarget = null;

  // gets the selectros
  function getDOMItems() {
    return DOMItems;
  }

  // geta data from main form
  function getData() {
    const data = {
      number: DOMItems.numField.value,
      data: DOMItems.dataField.value,
      hrs: parseInt(DOMItems.hrsField.value),
      mins: parseInt(DOMItems.minsField.value),
    };
    let result = data;
    // now validating data
    if (data.number === "") {
      raiseError(DOMItems.numField, "Invalid number given...");
      result = null;
    }
    if (data.hrs < 0 || isNaN(data.hrs)) {
      raiseError(DOMItems.hrsField, "Invalid hours given...");
      result = null;
    }
    if (isNaN(data.mins) || data.mins < 0 || data.mins >= 60) {
      raiseError(DOMItems.minsField, "Max minute value is 59...");
      result = null;
    }
    return result;
  }

  function raiseError(field, msg) {
    field.parentNode.classList.add("error");
    field.parentNode.querySelector(".error-msg").textContent = msg;
  }

  function clearFields() {
    DOMItems.numField.value = "";
    DOMItems.dataField.value = "";
    DOMItems.hrsField.value = "";
    DOMItems.minsField.value = "";
  }

  // flashes the interface
  function flash(message, cls) {
    DOMItems.flashContainer.querySelector("p").innerHTML = message;
    DOMItems.flashContainer.classList.add(cls);
    setTimeout(function () {
      DOMItems.flashContainer.classList.remove(cls);
    }, 3000);
  }

  // shows the reservations
  function handleResBox(timerObj, target, pageX, pageY) {
    const resBox = DOMItems.resBox;
    if (raisedTarget === target) {
      target.classList.remove("turned-on");
      resBox.style.display = "none";
      raisedTarget = null;
    } else {
      let listString = "";
      for (const item of timerObj.reservations) {
        listString += `<li>${item}</li>`;
      }
      resBox.querySelector("ol").innerHTML = listString;
      resBox.style.display = "block";
      resBox.style.top = `${pageY - resBox.offsetHeight}px`;
      resBox.style.left = `${pageX + 10}px`;
      target.classList.add("turned-on");
      if (raisedTarget !== null) {
        raisedTarget.classList.remove("turned-on");
      }
      raisedTarget = target;
    }
  }

  // loads the edit mode for a reservation
  function loadEdit(timerObject){
    timerObject.elementForm.querySelector('.data').style.display = 'none';
    timerObject.elementForm.querySelector('.add-card').style.display = 'flex';
  }

  function removeEdit(timerObject){
    timerObject.elementForm.querySelector('.data').style.display = 'flex';
    timerObject.elementForm.querySelector('.add-card').style.display = 'none';
  }

  function getDataFrom(timerObject){
    const data = {
      hours: parseInt(timerObject.elementForm.querySelector('.hours').value),
      mins: parseInt(timerObject.elementForm.querySelector('.minutes').value)
    };
    let result = data;
    if(isNaN(data.hours) || data.hours < 0){
      flash('Invalid data given !', 'error');
      result = null;
    }
    if(isNaN(data.mins) || data.mins < 0 || data.mins > 59){
      flash('Invalid data given !', 'error');
      result = null;
    }
    return result;

  }
  // exports
  return {
    getDOMItems,
    getData,
    clearFields,
    flash,
    handleResBox,
    loadEdit,
    removeEdit,
    getDataFrom
  };
})();
