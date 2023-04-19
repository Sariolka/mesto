export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }


  addItem(item) {   //принимает разметку карточки и вставляет ее в контейнер
    this._container.prepend(item);
  }
  
  renderItems(items) { //перебирает initialItems и вызывает для каждой addItem
    items.forEach((item) => {
      this._renderer(item);        //конструкция [].concat(data).forEach(() => {})
    });
  }
}