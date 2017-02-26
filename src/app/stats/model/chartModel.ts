export class Chart {
  type: string;
  data: ChartData = new ChartData();
  options?: ChartOptions;
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
  lineTension?: number;
}

export class ChartOptions {
  scales?: ChartScales = new ChartScales();
}

export class ChartScales {
  xAxes?: Array<ChartScale> = [new ChartScale()];
  yAxes?: Array<ChartScale> = [new ChartScale()];
}

export class ChartScale {
  stacked?: boolean;
  ticks?: ChartTick = new ChartTick();
}

export class ChartTick {
  min?: number;
  max?: number;
  suggestedMin?: number;
  suggestedMax?: number;
}
