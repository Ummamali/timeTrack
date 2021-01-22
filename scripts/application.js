// this is the main application file

App = (function (UiCtrl, TimeCtrl) {
  // This is the main app controller
  const selectors = UiCtrl.getSelectors();

  function createPushItem(itemData) {
    const table = new TableItem(
      itemData.number,
      itemData.data,
      itemData.hrs,
      itemData.mins
    );
    document.querySelector(selectors.itemsList).appendChild(table.elementForm);
    TimeCtrl.push(table);
  }

  // loads all the listeners
  function loadListeners() {
    // when the main form gets submitted
    document
      .querySelector(selectors.mainForm)
      .addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = UiCtrl.getData();
        createPushItem(formData);
        UiCtrl.clearFields();
      });
  }

  // initializes the app
  function init() {
    loadListeners();
    TimeCtrl.startMainTimer();
  }

  return {
    init,
  };
})(UiCtrl, TimeCtrl);

App.init();
