export const user_agent = 'Sesemi-dashboard/0.1.0(1) web/1.0.0';

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}