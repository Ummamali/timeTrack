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
  };

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
  // exports
  return {
    getDOMItems,
    getData,
    clearFields,
    flash,
  };
})();
