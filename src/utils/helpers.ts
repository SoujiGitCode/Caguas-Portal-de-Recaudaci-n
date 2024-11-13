import dayjs, { Dayjs } from 'dayjs';

export const debounce = <A = unknown, R = void>(
  // source: https://stackblitz.com/github/Bwca/demo__use-debounce-hook?file=src%2Fdebounce%2Fdebounce.ts
  fn: (args: A) => R,
  ms: number
): [(args: A) => Promise<R>, () => void] => {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(fn(args));
      }, ms);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
};

export const getFormattedDate = (inputDate: string) => {
  return dayjs(inputDate).format('MM/DD/YYYY');
}