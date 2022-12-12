import { newPage } from '../../index';
import ICar from '../cars/ICar';
import IModel from './IModel';

/* eslint-disable class-methods-use-this */
class Model implements IModel {
  pageNumber = 1;

  getDataonPage(): Promise<ICar[]> {
    const getPage = async (pageNumber: number = 1): Promise<ICar[]> => {
      const response = await fetch(`http://localhost:3000/garage?_page=${pageNumber}&_limit=7`);
      const data = await response.json();
      return data;
    };

    const createPage = async (num: number = 1): Promise<ICar[]> => {
      const page = await getPage(num);
      return page;
    };
    const cars = createPage();
    return cars;
  }

  createOneCar(carName: string, carColor: string): void {
    fetch('http://localhost:3000/garage', {
      method: 'POST',
      body: JSON.stringify({ name: carName, color: carColor }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  onUpdateCar(id: number, oldName: string, oldColor: string): void {
    const nameCar = (<HTMLInputElement>document.querySelector('.garage__update-name')).value
      ? (<HTMLInputElement>document.querySelector('.garage__update-name')).value
      : oldName;
    const colorCar = (<HTMLInputElement>document.querySelector('.garage__update-color')).value !== '#000000'
      ? (<HTMLInputElement>document.querySelector('.garage__update-color')).value
      : oldColor;

    fetch(`http://localhost:3000/garage/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: nameCar, color: colorCar }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    (document.querySelector('.garage__cars') as HTMLDivElement).innerHTML = '';
    const pageNumber = +(localStorage.getItem('page'));
    newPage(pageNumber);
  }

  createWinner(carId: number, carName: string, carColor: string): void {
    fetch('http://localhost:3000/winners', {
      method: 'POST',
      body: JSON.stringify({ id: carId, name: carName, color: carColor }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default Model;
