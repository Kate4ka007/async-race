class Winner {
  id: string;

  tag: string;

  car: string;

  constructor(id: string, tag: string, car: string) {
    this.id = id;
    this.tag = tag;
    this.car = car;

    const modal = document.createElement('div');
    modal.className = tag;
    modal.innerHTML = `<div class='modal-alert'>
                          <span class='alert'>${this.car} is winner!!! (${localStorage.getItem('winnerTime')} sec)</span>
                       </div>`;
    document.body.appendChild(modal);

    setTimeout(() => {
      modal.remove();
    }, 5000);
  }
}

export default Winner;
