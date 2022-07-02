import { SoursesDataInt, Options, CallbackData, ILoader } from '../intefaces';

enum Status {
  'errFirst' = 401,
  'errFour' = 404,
}
class Loader implements ILoader {
  readonly baseLink: string;
  readonly options: { apiKey: string };
  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint = '' as string, options = {} as Options },
    callback: () => void = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === Status.errFirst || res.status === Status.errFour)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: Options, endpoint: string) {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
    });
    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: CallbackData, options: Options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: Pick<SoursesDataInt, 'sources' | 'status'>) => callback(data))
      .catch((err: string) => console.error(err));
  }
}

export default Loader;
