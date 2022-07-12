import { NewsItemInt, INews } from '../../intefaces';
import './news.scss';

class News implements INews {
  draw(data: NewsItemInt[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx: number) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = <HTMLTemplateElement>document.querySelector('#newsItemTemp');

    news.forEach((item: NewsItemInt, idx: number) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as Element;

      if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');
      (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
        item.urlToImage || 'images/news.jpg'
      })`;
      (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
      (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;
      (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
      (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
      (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (document.querySelector('.news') as HTMLElement).innerHTML = '';
    (document.querySelector('.news') as HTMLElement).appendChild(fragment);
  }
}

export default News;
