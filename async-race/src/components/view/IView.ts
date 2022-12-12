import ICar from '../cars/ICar';
import Generator from '../generator/generator';

interface IView {
  panel: Generator;

  count: number;

  generaGarage(dataCar: ICar[]): void;
}

export default IView;
