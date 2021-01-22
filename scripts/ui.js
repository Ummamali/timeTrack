// This module contains cll the ui functionality
UiCtrl = (function () {
  const selectors = {
    mainForm: "#main-form",
    numField: "#t-number",
    dataField: "#t-data",
    hrsField: "#hours",
    minsField: "#minutes",
    itemsList: "#items-list",
  };

  // gets the selectros
  function getSelectors() {
    return selectors;
  }

  // geta data from main form
  function getData() {
    const data = {
      number: document.querySelector(selectors.numField).value,
      data: document.querySelector(selectors.dataField).value,
      hrs: document.querySelector(selectors.hrsField).value,
      mins: document.querySelector(selectors.minsField).value,
    };
    return validate(data);
  }

  function raiseError(field, msg){
    field.parentNode.classList.add('error');
    const listener = field.addEventListener('focus', function(e){
      this.parentNode.classList.remove('error');
      
    });
  }

  function clearFields() {
    document.querySelector(selectors.numField).value = "";
    document.querySelector(selectors.dataField).value = "";
    document.querySelector(selectors.hrsField).value = "";
    document.querySelector(selectors.minsField).value = "";
  }

  function validate(data) {
    if(data)
  }
  // exports
  return {
    getSelectors,
    getData,
    clearFields,
  };
})();
