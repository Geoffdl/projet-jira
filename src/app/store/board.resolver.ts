import { ResolveFn } from '@angular/router';

export const boardResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
