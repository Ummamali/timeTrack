// this is the main application file

App = (function (UiCtrl, TimeCtrl) {
  // This is the main app controller
  const DOMItems = UiCtrl.getDOMItems();
  const itemsIds = [];

  function createPushItem(itemData) {
    const table = new TableItem(
      itemData.number,
      itemData.data,
      itemData.hrs,
      itemData.mins
    );
    DOMItems.itemsList.appendChild(table.elementForm);
    TimeCtrl.push(table);
    itemsIds.push(table.id);
  }

  function removeItem(itemId) {
    const index = itemsIds.findIndex((id) => id === itemId);
    itemsIds.splice(index, 1);
    TimeCtrl.remove(index);
  }

  // loads all the listeners
  function loadListeners() {
    // when the main form gets submitted
    DOMItems.mainForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = UiCtrl.getData();
      if (formData !== null) {
        // now checking whether the id alredy exists or not
        if (itemsIds.includes(formData.number) === false) {
          createPushItem(formData);
          UiCtrl.clearFields();
          UiCtrl.flash(`Table ${formData.number} has been added`, "success");
        } else {
          UiCtrl.flash(`Table ${formData.number} already reserved`, "error");
        }
      }
    });

    // This listener to remove any error on the field
    const fields = [
      DOMItems.numField,
      DOMItems.dataField,
      DOMItems.hrsField,
      DOMItems.minsField,
    ];
    for (const field of fields) {
      field.addEventListener("focus", function (e) {
        this.parentNode.classList.remove("error");
      });
    }

    // The listener to remove the reservation
    DOMItems.itemsList.addEventListener("click", function (e) {
      const target = e.target;
      if (target.dataset.func === "delete") {
        const id = target.parentNode.parentNode.parentNode.dataset.id;
        removeItem(id);
      }
    });
  }

  // initializes the app
  function init() {
    loadListeners();
  }

  return {
    init,
  };
})(UiCtrl, TimeCtrl);

App.init();
