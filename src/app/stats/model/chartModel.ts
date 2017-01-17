export class Chart {
  type: string;
  data: ChartData = new ChartData();
  options?: Object;
}

export class BarChart extends Chart {
  type = 'bar';
}

export class LineChart extends Chart {
  type = 'line';
}

export class ChartData {
  labels: string[];
  datasets: ChartDataSet[];
}

export class ChartDataSet {
  label: string;
  data: number[];

  fill?: boolean;
  stacked?: boolean;
}
