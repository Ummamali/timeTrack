// this is the main application file

App = (function (UiCtrl, TimeCtrl) {
  // This is the main app controller
  const DOMItems = UiCtrl.getDOMItems();

  function createPushItem(itemData) {
    const table = new TableItem(
      itemData.number,
      itemData.data,
      itemData.hrs,
      itemData.mins
    );
    DOMItems.itemsList.appendChild(table.elementForm);
    TimeCtrl.push(table);
  }

  // loads all the listeners
  function loadListeners() {
    // when the main form gets submitted
    DOMItems.mainForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = UiCtrl.getData();
      if (formData !== null) {
        createPushItem(formData);
      }
      UiCtrl.clearFields();
    });

    // This listener remover any error on the field
    const fields = [
      DOMItems.numField,
      DOMItems.dataField,
      DOMItems.hrsField,
      DOMItems.minsField,
    ];
    for (const field of fields) {
      field.originalMsg = field.getAttribute("placeholder");
      field.addEventListener("focus", function (e) {
        this.parentNode.classList.remove("error");
        this.setAttribute("placeholder", this.originalMsg);
      });
    }
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
