import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { formatDateShort } from '../../../utils';
import { Input } from '../../ui/Form';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          max: 10,
          min: 0,
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
      <h1 className="mb-5">Notas</h1>

      <Line
        className="mb-5"
        data={{
          labels: mapDates(),
          datasets: [
            {
              label: '# of Votes',
              data: mapGrades(),
              fill: false,
              backgroundColor: '#333fff',
              borderColor: '#555fff',
            },
          ],
        }}
        options={options}
      />

      <Input
        type="number"
        placeholder="Mostrar #n últimas notas .."
        label={`Mostrar as ${length} últimas notas`}
        id="add-course-results"
        value={length}
        onChange={(e) => setLength(e.target.value)}
        className="mb-10"
      />
    </section>
  );
};

export default Chart;
