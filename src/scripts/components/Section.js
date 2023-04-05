export class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {   //принимает разметку карточки и вставляет ее в контейнер
    this._container.prepend(item);
  }
  
  renderItems() { //перебирает initialItems и вызывает для каждой addItem
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }  
}