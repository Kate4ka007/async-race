import IButtons from './IBottons';

class Buttons implements IButtons {
  selector: string;

  parent: HTMLElement;

  content: string;

  callback: () => void;

  disabled: boolean;

  id: string;

  addTag: string;

  constructor(
    selector: string,
    parent: HTMLElement,
    content: string,
    callback?: () => void,
    id?: string,
    disabled?: boolean,
    addTag?: string,
  ) {
    this.selector = selector;
    this.parent = parent;
    this.content = content;
    this.callback = callback;
    this.disabled = disabled;
    this.id = id;
    this.addTag = addTag;

    const button = document.createElement('button');
    button.classList.add(this.selector);
    if (this.addTag) {
      button.classList.add(this.addTag);
    }
    button.textContent = this.content;
    button.disabled = this.disabled;
    button.id = this.id;
    this.parent.appendChild(button);

    button.addEventListener('click', () => {
      this.callback();
    });
  }
}

export default Buttons;
