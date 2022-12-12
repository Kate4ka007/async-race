import Buttons from '../buttons/botton';
import ICar from '../cars/ICar';
import IWinnerItem from './IWinnerItem';
import IWinnerPage from './IWinnerPage';
import WinnerItem from './winnerItem';

class WinnerPage implements IWinnerPage {
  count: number;

  constructor() {
    this.count = 1;
    const winners = document.createElement('div');
    winners.className = 'winners__items';

    const title = document.createElement('div');
    title.className = 'winners__title';

    const page = document.createElement('div');
    page.className = 'winners__count-winners';

    fetch('http://localhost:3000/winners')
      .then((response) => response.json())
      .then((data: IWinnerItem[]) => {
        page.innerHTML = `WINNERS ( ${data.length} )`;
      });

    title.appendChild(page);

    const pageCount = document.createElement('div');
    pageCount.className = 'winners__count-pages';
    pageCount.innerHTML = `Page #${this.count}`;
    title.appendChild(pageCount);
    winners.appendChild(title);

    const table = document.createElement('div');
    table.className = 'winners__table-container';
    table.innerHTML = `<div class='winners__table'>
                            <table>
                            <thead class='winners__table-headers'>
                              <tr class='winners__table-row'>
                                <th class='winners__table-number th'>№</th>
                                <th class='winners__table-column th'>Image of the car</th>
                                <th class='winners__table-column th' id='sort-id'>Name of the car &#8679;</th>
                                <th class='winners__table-column th' id='sort-number'>Wins number &#8679;</th>
                                <th class='winners__table-column th' id='sort-time'>Best time in seconds &#8679;</th>
                              </tr>
                            </thead>
                            <tbody class='winners__table-body'>
                            </tbody>
                          </table>
                         </div>`;
    winners.appendChild(table);
    const root2 = document.createElement('div');
    root2.className = 'app__winners';
    root2.classList.add('winners');

    root2.appendChild(winners);
    document.body.appendChild(root2);

    if (!localStorage.getItem('pageWinners')) {
      localStorage.setItem('pageWinners', '1');
    }

    localStorage.setItem('pageWinners', '1');
    this.getPageWinners();

    const pagination = document.createElement('div');
    pagination.className = 'winners__pagination';
    const prev = new Buttons('btn-select', pagination, 'prev', () => {
      let count = +localStorage.getItem('pageWinners');
      count -= 1;
      if (count === 1) {
        (<HTMLButtonElement>document.getElementById('win-prev')).disabled = true;
      }
      this.count = count;
      pageCount.innerHTML = `Page #${this.count}`;
      document.querySelector('.winners__table-body').innerHTML = '';
      this.getPageWinners();
      (<HTMLButtonElement>document.getElementById('win-next')).disabled = false;

      localStorage.setItem('pageWinners', this.count.toString());
    }, 'win-prev', true);
    const next = new Buttons('btn-select', pagination, 'next', () => {
      (<HTMLButtonElement>document.getElementById('win-prev')).disabled = false;
      let count = +localStorage.getItem('pageWinners');
      count += 1;
      this.count = count;
      pageCount.innerHTML = `Page #${this.count}`;
      document.querySelector('.winners__table-body').innerHTML = '';
      this.getPageWinners();

      localStorage.setItem('pageWinners', this.count.toString());

      fetch('http://localhost:3000/winners')
        .then((response) => response.json())
        .then((data: IWinnerItem[]) => {
          if (this.count >= Math.ceil(data.length / 10)) {
            (<HTMLButtonElement>document.getElementById('win-next')).disabled = true;
          }
        })
        .catch((err) => console.error(err));
    }, 'win-next', false);
    winners.appendChild(pagination);
    const sortId = document.getElementById('sort-id');
    sortId.addEventListener('click', () => {
      sortId.classList.toggle('down');
      if (sortId.classList.contains('down')) {
        this.sortWinners(pageCount, 'id', 'ASC');
      } else {
        this.sortWinners(pageCount, 'id', 'DESC');
      }
    });

    const sortTime = document.getElementById('sort-time');
    sortTime.addEventListener('click', () => {
      sortTime.classList.toggle('down');
      if (sortTime.classList.contains('down')) {
        this.sortWinners(pageCount, 'time', 'ASC');
      } else {
        this.sortWinners(pageCount, 'time', 'DESC');
      }
    });

    const sortWins = document.getElementById('sort-number');
    sortWins.addEventListener('click', () => {
      sortWins.classList.toggle('down');
      if (sortWins.classList.contains('down')) {
        this.sortWinners(pageCount, 'wins', 'ASC');
      } else {
        this.sortWinners(pageCount, 'wins', 'DESC');
      }
    });
  }

  getPageWinners(): void {
    fetch(`http://localhost:3000/winners?_page=${this.count}&_limit=10`)
      .then((response) => response.json())
      .then((data: IWinnerItem[]) => {
        data.forEach((el, ind: number) => {
          fetch(`http://localhost:3000/garage/${el.id}`)
            .then((response) => response.json())
            .then((datacar: ICar) => {
              const winItem = new WinnerItem(
                el.id,
                datacar.name,
                +el.time,
                datacar.color,
                ((this.count - 1) * 10 + ind + 1),
              );
            });
        });
      })
      .catch((err) => console.error(err));
  }

  sortWinners(tag: HTMLDivElement, sortType: 'id' | 'wins' | 'time', order: 'ASC' | 'DESC'): void {
    this.count = 1;
    // eslint-disable-next-line no-param-reassign
    tag.innerHTML = `Page #${this.count}`;
    document.querySelector('.winners__table-body').innerHTML = '';
    fetch(`http://localhost:3000/winners?_page=${this.count}&_limit=10&_sort=${sortType}&_order=${order}`)
      .then((response) => response.json())
      .then((data: IWinnerItem[]) => {
        data.forEach((el, ind: number) => {
          fetch(`http://localhost:3000/garage/${el.id}`)
            .then((response) => response.json())
            .then((datacar: ICar) => {
              const { color } = datacar;
              const winItem = new WinnerItem(
                el.id,
                datacar.name,
                +el.time,
                color,
                ((this.count - 1) * 10 + ind + 1),
              );
            });
        });
      })
      .catch((err) => console.error(err));
  }
}

export default WinnerPage;
