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
        // now checking whether the id alredy exists or not
        if (typeof TimeCtrl.getTimer(formData.number) === "undefined") {
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
      let id =
        target.parentNode.parentNode.parentNode.parentNode.dataset.id;
      if (target.dataset.func === "delete") {
        TimeCtrl.getTimer(id).elementForm.remove();
        TimeCtrl.remove(id);
      } else if (target.dataset.func === "reservations") {
        UiCtrl.handleResBox(TimeCtrl.getTimer(id), target, e.pageX, e.pageY);
      } else if (target.dataset.func === 'add-res'){
        UiCtrl.loadEdit(TimeCtrl.getTimer(id))
      } else if (target.dataset.func === 'cancel-res'){
        id = target.parentNode.parentNode.parentNode.dataset.id;
        UiCtrl.removeEdit(TimeCtrl.getTimer(id));
      } else if(target.dataset.func === 'start-new'){
        id = target.parentNode.parentNode.parentNode.dataset.id;
        const timerObject = TimeCtrl.getTimer(id);  
        const data = UiCtrl.getDataFrom(timerObject);
        if(data !== null){
          timerObject.startNew(data.hours, data.mins);
          UiCtrl.removeEdit(timerObject);
        }
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
