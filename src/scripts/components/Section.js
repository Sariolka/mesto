export class Section {
  constructor({renderer}, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {   //вставляет в контейнер 1 карточку
    this._container.prepend(item);
  }
  
  addItems(item) {   //отрисосывает принимаемые карточки
    this._container.append(item);
  }

  renderItems(items) { //перебирает initialItems и вызывает для каждой addItem
    items.forEach((item) => {
      this._renderer(item);        //конструкция [].concat(data).forEach(() => {})
    });
  }
}