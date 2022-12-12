interface IButtons {
  selector: string;

  parent: HTMLElement;

  content: string;

  callback: () => void;

  disabled: boolean;

  id: string;

  addTag: string;
}

export default IButtons;
