export const SelcomServerAddress = 'http://52.211.232.77';
// export const ServerAddress = 'https://sesemi-app.herokuapp.com';

// export const ServerAddress = 'http://172.20.10.4:3001';
// export const SelcomServerAddress = 'http://172.20.10.4:3003';

export const ServerAddress = 'http://192.168.8.101:3001';
// export const SelcomServerAddress = 'http://192.168.8.101:3003';


export const user_agent = 'Sesemi-dashboard/0.1.0(1) web/1.0.0';

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}