export class StatisticsData {

}

export class FrequencyStatisticsData extends StatisticsData {
  frequencyMap: Object;
  conditionAnswerMap: Object;
  surveyAnswerMap: Object;
}

export class DescriptiveStatisticsData extends StatisticsData {
  statisticsMap: Object;
}
