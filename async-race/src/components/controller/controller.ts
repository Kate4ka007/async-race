import ICar from '../cars/ICar';
import Car from '../cars/car';
import View from '../view/view';
import Model from '../model/model';
import IController from './IController';

class Controller implements IController {
  model: Model;

  view: View;

  pageCount: number;

  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;
    const page = this.model.getDataonPage();
    page.then((data) => this.view.generaGarage(data));

    this.pageCount = this.model.pageNumber;
    (<HTMLButtonElement>document.querySelector('.garage__btn-create')).addEventListener('click', () => {
      const name = (<HTMLInputElement>document.querySelector('.garage__create-name')).value;
      const color = (<HTMLInputElement>document.querySelector('.garage__create-color')).value;
      this.model.createOneCar(name, color);
      const pageNumber = +(localStorage.getItem('page'));
      (document.querySelector('.garage__cars') as HTMLDivElement).innerHTML = '';
      fetch(`http://localhost:3000/garage?_page=${pageNumber}&_limit=7`)
        .then((response) => response.json())
        .then((data: ICar[]) => {
          data.forEach((element) => {
            const car = new Car(element.id, element.name, element.color);
          });
        })
        .catch((err: string) => console.error(err));

      fetch('http://localhost:3000/garage')
        .then((response) => response.json())
        .then((data: ICar[]) => {
          document.querySelector('.garage__count-cars').innerHTML = `GARAGE ( ${data.length} )`;
        });
    });
  }
}

export default Controller;
