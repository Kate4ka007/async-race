import Model from '../model/model';
import View from '../view/view';

interface IController {
  model: Model;

  view: View;

  pageCount: number;

}

export default IController;
