import React, { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonLabel,
  IonContent,
  IonAvatar,
  IonText,
} from '@ionic/react';
import './Tab2.css';
import { fetchForecast, convertDate } from '../services';

const Tab2: React.FC = () => {
  const [forecast, setForecast] = useState<any>([]);
  const [city, setCity] = useState<string>('');

  useEffect(() => {
    getForecast();
  }, []);

  const getForecast = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    fetchForecast(coordinates).then((res: any) => {
      setForecast(res.list);
      setCity(res.city.name);
      setTimeout(() => {
        document.title = 'Forecast Weather';
      }, 1000);
    });
  };

  const ListForecast = (data: any, key: string) => {
    return (
      <IonItem key={key}>
        <IonAvatar slot="start">
          <img
            src={`https://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`}
            alt="img weather"
          />
        </IonAvatar>
        <IonLabel>
          <IonText>
            <h3>{data.data.weather[0].description}</h3>
          </IonText>
          <p>{convertDate(data.data.dt_txt)}</p>
          <p>
            {data.data.main.temp_min}°C - {data.data.main.temp_max}°C
          </p>
        </IonLabel>
        <IonText color="success" slot="end">
          <p className="main-temp">{data.data.main.temp}°C</p>
        </IonText>
      </IonItem>
    );
  };
  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonTitle>Forecast {city}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="none">
          {forecast ? (
            forecast.map(function (value: any, key: number) {
              return <ListForecast data={value} key={key} />;
            })
          ) : (
            <div className="container">Data cannot be displayed</div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
