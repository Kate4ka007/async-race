import ICar from '../cars/ICar';
import { newPage } from '../../index';
import Buttons from '../buttons/botton';
import WinnerPage from '../winner/winnerPage';
import IGenerator from './IGenerator';

class Generator implements IGenerator {
  count: number;

  constructor(count: number) {
    this.count = count;
    const root = document.createElement('div');
    root.className = 'app__garage';
    root.classList.add('garage');

    const pages = document.createElement('div');
    pages.className = 'app__switch';
    const gar = new Buttons('btn-select', pages, 'Garage', () => {
      root.style.display = 'block';
      document.querySelector('.app__winners').remove();
    }, 'garage__cars');
    const win = new Buttons('btn-select', pages, 'Winners', () => {
      root.style.display = 'none';
      const winners = new WinnerPage();
    }, 'winners__items');
    document.body.appendChild(pages);
    const panel = document.createElement('div');
    panel.className = 'garage__controls';
    panel.innerHTML = `<div class='garage__create-car'>
                          <input type='text' class='garage__create-name input-text'>
                          <input type='color' class='garage__create-color input-color' value='#00ff91'>
                          <button class='garage__btn-create btn-select'>CREATE</button></div>
                       <div class='garage__update-car'>
                          <input type='text' class='garage__update-name input-text'>
                          <input type='color' class='garage__update-color input-color' value='#00ff91'>
                          <button class='garage__btn-update btn-select' disabled=false>UPDATE</button></div>
                       <div class='garage__race'>
                          <button class='garage__btn-race btn-select'>RACE</button>
                          <button class='garage__btn-reset btn-select'>RESET</button>
                          <button class='garage__btn-generate btn-select'>GENERATE CARS</button></div>`;

    const title = document.createElement('div');
    title.className = 'garage__title';

    const page = document.createElement('div');
    page.className = 'garage__count-cars';

    let len: number;
    fetch('http://localhost:3000/garage')
      .then((response) => response.json())
      .then((data: ICar[]) => {
        len = data.length;
        page.innerHTML = `GARAGE ( ${data.length} )`;
      });

    title.appendChild(page);

    const pageCount = document.createElement('div');
    pageCount.className = 'garage__count-pages';
    pageCount.innerHTML = `Page #${this.count}`;
    title.appendChild(pageCount);

    document.body.appendChild(root);
    root.appendChild(panel);
    root.appendChild(title);
    const garage = document.createElement('div');
    garage.className = 'garage__cars';
    root.appendChild(garage);

    const paginator = document.createElement('div');
    paginator.className = 'garage__paginator';

    const prev = new Buttons('btn-select', paginator, 'prev', () => {
      garage.innerHTML = '';
      this.count -= 1;
      if (this.count < 2) {
        this.count = 1;
        (document.getElementById('prev') as HTMLButtonElement).disabled = true;
      } else {
        (document.getElementById('prev') as HTMLButtonElement).disabled = false;
      }
      newPage(this.count);
      pageCount.innerHTML = `Page #${this.count}`;
      localStorage.setItem('page', this.count.toString());
      (document.getElementById('next') as HTMLButtonElement).disabled = false;
    }, 'prev', true);

    const next = new Buttons('btn-select', paginator, 'next', () => {
      garage.innerHTML = '';
      this.count += 1;
      if (this.count > Math.ceil(len / 7)) {
        this.count -= 1;
        (document.getElementById('next') as HTMLButtonElement).disabled = true;
      }
      if (this.count > len / 7) {
        (document.getElementById('next') as HTMLButtonElement).disabled = true;
      } else {
        (document.getElementById('next') as HTMLButtonElement).disabled = false;
      }
      newPage(this.count);
      pageCount.innerHTML = `Page #${this.count}`;
      localStorage.setItem('page', this.count.toString());
      (document.getElementById('prev') as HTMLButtonElement).disabled = false;
    }, 'next');

    root.appendChild(paginator);
  }
}

export default Generator;
