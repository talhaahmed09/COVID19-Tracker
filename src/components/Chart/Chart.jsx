import React, { useState, useEffect } from 'react';
import {fetchDailyData} from '../../api';
import { Line } from 'react-chartjs-2';

import styles from './Chart.module.css';

 const Chart = ({data: {confirmed, deaths, recovered } , country }) => {
    const [ dailyData, setDailyData ] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
       
        fetchAPI();
    },[]);

    const lineChart = (
        dailyData[0] 
         ?(
        <Line 
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets:[{
                data: dailyData.map(({ confirmed }) => confirmed),
                label: 'infected',
                borderColor: '#3333ff',
                fill:true,
            },{
                data: dailyData.map(({ deaths }) => deaths),
                label: 'deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.5)',
                fill:true,
            }]
        }}
        />) : null
    );
      
    
          
    return (
      <div className={styles.container}>
        { !country ? lineChart : null }

    </div>
    )
}

export default Chart;