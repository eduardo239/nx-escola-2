import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatDateShort } from '../../../utils';
import { Input } from '../../ui/Form';

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
  const [length, setLength] = useState(5);

  const mapDates = () => {
    return user_grades.map((x) => formatDateShort(x.updated_at)).slice(-length);
  };
  const mapGrades = () => {
    return user_grades.map((x) => x.result).slice(-length);
  };

  mapDates();
  return (
    <section>
      <h1>Notas</h1>

      <Input
        type="number"
        placeholder="Mostrar #n últimas notas .."
        label="Runtime"
        id="add-course-runtime"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="w-100"
      />

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