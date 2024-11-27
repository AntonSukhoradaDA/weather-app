import React, { useEffect, useState } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { fetchWeather } from '../services';
import './Tab1.css';

const LocalWeather = (props: any) => {
  let main = props.data.main || {};
  let weather = props.data.weather || [];
  let wind = props.data.wind || {};

  interface KeyValuePair {
    icon: string;
    description: string;
  }

  let data: KeyValuePair = { icon: '', description: '' };

  weather.forEach(function (value: any) {
    data.icon = value.icon;
    data.description = value.description;
  });

  return (
    <div className="container">
      {weather ? (
        <>
          <h1 className="ion-60p">Temperature: {main.temp} °C </h1>
          <h2 className="ion-60p">Humidity: {main.humidity}%</h2>
          <h2 className="ion-60p">Wind: {wind.speed} m/s</h2>
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt={data.description}
            style={{ width: '240px' }}
          />
          <p>{data.description}</p>
        </>
      ) : (
        'Loading Content'
      )}
    </div>
  );
};

const Tab1: React.FC = () => {
  const [weather, setWeather] = useState<any>([]);

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    fetchWeather(coordinates).then((res: any) => {
      setWeather(res);
      setTimeout(() => {
        document.title = 'Current Weather';
      }, 1000);
    });
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle className="ion-text-capitalize">
            {' '}
            {weather ? weather.name : 'Data not found'}{' '}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="container-tab1">
          {weather ? <LocalWeather data={weather} /> : 'Data not found'}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
