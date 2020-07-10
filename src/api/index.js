import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `https://covid19.mathdro.id/api/countries/${country}`;
  }

  try {
    const { data: { confirmed, deaths, recovered, lastUpdate  } } = await axios.get(changeableUrl);

    return { confirmed, deaths, recovered, lastUpdate  };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`https://covid19.mathdro.id/api/daily`);

    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get('https://covid19.mathdro.id/api/countries');

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
