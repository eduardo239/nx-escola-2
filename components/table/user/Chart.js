import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatDateShort } from '../../../utils';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Chart = ({ user_grades }) => {
  const mapDates = () => {
    return user_grades.map((x) => formatDateShort(x.updated_at));
  };
  const mapGrades = () => {
    return user_grades.map((x) => x.result);
  };

  mapDates();
  return (
    <section>
      <h1>Notas</h1>
      <Line
        data={{
          labels: mapDates(),
          datasets: [
            {
              label: '# of Votes',
              data: mapGrades(),
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ],
        }}
        options={options}
      />
    </section>
  );
};

export default Chart;
