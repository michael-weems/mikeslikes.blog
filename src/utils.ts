export function isDefined<T>(arg: null | undefined | T): arg is T {
  if (arg == null) return false;
  if (arg == undefined) return false;
  return true;
}
export function isNotDefined<T>(arg: null | undefined | T): arg is (null | undefined) {
  return !isDefined(arg);
}

export async function whenElementReady(selector: string) : Promise<Element>{
  while ( document.querySelector(selector) === null) {
    await new Promise( resolve =>  requestAnimationFrame(resolve) );
  }
  return document.querySelector(selector) as Element; 
}

export function titleCase(value: string): string{
  return value.split('-').map( (word) => 
    (word.charAt(0).toUpperCase() + word.slice(1))
  ).join(' ');
}

/**
 * https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param func 
 * @param timeout 
 * @returns 
 */
export function debounce(func: Function, timeout = 300){
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func(...args); }, timeout);
  };
}
