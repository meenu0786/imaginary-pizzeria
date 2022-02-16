import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
  Tooltip,
  Title                              
} from '@devexpress/dx-react-chart-material-ui';
import { EventTracker } from '@devexpress/dx-react-chart';

const currentMonth = (new Date()).toLocaleString('default', { month: 'short', year: 'numeric' })


const DisplayChart = ({ data }) => (
  <Paper>
    <Chart data={data}>
      <ArgumentAxis tickSize={10} />
      <ValueAxis/>

      <LineSeries valueField="count" argumentField="day" />
      <Title
          text={`Order By Day - ${currentMonth}`}
      />
      <EventTracker />
      <Tooltip />
    </Chart>
  </Paper>
);

export default DisplayChart;