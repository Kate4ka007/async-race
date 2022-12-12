import ICar from '../cars/ICar';

interface IModel {
  pageNumber: number;

  getDataonPage(): Promise<ICar[]>;

  createOneCar(carName: string, carColor: string): void;

  onUpdateCar(id: number, oldName: string, oldColor: string): void;

  createWinner(carId: number, carName: string, carColor: string): void;
}

export default IModel;
