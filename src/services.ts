import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';
import { Position } from '@capacitor/geolocation';
moment.locale('id');

export const weatherService = {
  url: 'https://api.openweathermap.org/data/2.5/',
  key: 'ca90722e10f0a0fdd99f15f4314073db',
};

export const fetchWeather = async (coords: Position) => {
  try {
    const res = await axios.get(
      `${weatherService.url}weather?lat=${coords.coords.latitude}&lon=${coords.coords.longitude}&appid=${weatherService.key}&units=metric`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchForecast = async (coords: Position) => {
  try {
    const res = await axios.get(
      `${weatherService.url}/forecast?lat=${coords.coords.latitude}&lon=${coords.coords.longitude}&appid=${weatherService.key}&units=metric`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const convertDate = (date: moment.MomentInput) => {
  if (!date) return null;
  return moment(date).format('lll');
};
