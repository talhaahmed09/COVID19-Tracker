import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';
import {  Bar, Doughnut } from 'react-chartjs-2';

import styles from './CountryChart.module.css';

 const CountryChart = ({data: {confirmed, deaths, recovered } , country }) => {
    const [ dailyData, setDailyData ] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
           
        }

        fetchAPI();
    },[]);

    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current state in ${country}` },
            }}
          />
        ) : null
      );

      const doughnutChart = ( confirmed ? (
        <Doughnut
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
              {
                label: 'People',
                backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                data: [confirmed.value, recovered.value, deaths.value],
              },
            ],
          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}
        />
      ) : null);

    return (
      <div className={styles.container}>
      {barChart} 
      {doughnutChart }

    </div>
    )
}

export default CountryChart;