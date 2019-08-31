import { Component, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/ITask';

const DEFAULT_CHART_OPTIONS: Highcharts.Options = {
  title: {
    text: ''
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          yAxis: {
            labels: {
              align: 'left',
              x: 0,
              y: -5
            },
            title: {
              text: null
            }
          },
          subtitle: {
            text: null
          },
          credits: {
            enabled: false
          }
        }
      }
    ]
  }
};

@Component({
  selector: 'app-charts-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements AfterViewInit {
  private sourceData: Task[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private tasksService: TasksService
  ) {}
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {}; // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngularFlag = false; // optional boolean, defaults to false

  public cards = [
    {
      title: 'Amount of time per task',
      cols: 2,
      rows: 1,
      visible: true,
      chartOptions: { series: {} } as Highcharts.Options
    },
    {
      title: 'Monthly work done',
      cols: 2,
      rows: 1,
      visible: true,
      chartOptions: { series: {} } as Highcharts.Options
    },
    {
      title: 'Last 7 days',
      cols: 2,
      rows: 1,
      visible: true,
      chartOptions: { series: {} } as Highcharts.Options
    },
    {
      title: 'Task by status',
      cols: 2,
      rows: 1,
      visible: true,
      chartOptions: { series: {} } as Highcharts.Options
    }
  ];

  private getPieStatus(data: Task[]) {
    const dataSeries = data.reduce((acc, cur) => {
      if (!acc[cur.status]) {
        acc[cur.status] = 1;
      } else {
        acc[cur.status]++;
      }
      return acc;
    }, {});
    const mappedSeries = [];
    for (const status in dataSeries) {
      if (dataSeries.hasOwnProperty(status)) {
        mappedSeries.push({ name: status, y: dataSeries[status] });
      }
    }
    return mappedSeries;
  }

  private getPieValues(data: Task[]) {
    const dataSeries = data.map(task => ({
      name: task.reference,
      y:
        (task.timeWorked.length > 0
          ? task.timeWorked.reduce((acc, cur) => acc + cur.amount, 0)
          : 0) / 1000
    }));

    // Projection to percentage no longer needed
    // const totalTimeForAllSeries = dataSeries.reduce(
    //   (acc, cur) => acc + cur.y,
    //   0
    // );
    // const result = dataSeries.map(dataPoint => ({
    //   name: dataPoint.name,
    //   y: this.roundNoFloating((dataPoint.y * 100) / totalTimeForAllSeries)
    // }));
    // return result;
    return dataSeries;
  }

  private getMonthlyValues(data: Task[]) {
    const monthlyData = new Array(12).fill(0);
    data.forEach(task =>
      task.timeWorked.forEach(time => {
        const month = new Date(time.timestamp).getMonth();
        monthlyData[month] += time.amount / 1000;
      })
    );
    return monthlyData;
  }

  private getLast7DaysValues(data: Task[]) {
    const last7Days = this.getLast7Days();
    const weeklyData = new Array(7).fill(0);

    data.forEach(task =>
      task.timeWorked.forEach(timeObj => {
        const dayOfTimestamp = new Date(timeObj.timestamp);
        const match = last7Days.findIndex(
          (date: Date) =>
            date.getDate() === dayOfTimestamp.getDate() &&
            date.getMonth() === dayOfTimestamp.getMonth() &&
            date.getFullYear() === dayOfTimestamp.getFullYear()
        );
        if (match >= 0) {
          weeklyData[match] += timeObj.amount / 1000;
        }
      })
    );
    return weeklyData;
  }

  private getLast7Days() {
    const today = Date.now();
    const arr = new Array(7);

    for (let d = 6, i = 0; d >= 0; d--, i++) {
      arr[i] = new Date(today - d * 24 * 60 * 60 * 1000);
    }
    return arr;
  }

  createCards() {
    this.cards = [
      {
        title: 'Amount of time per task',
        cols: 2,
        rows: 1,
        visible: true,
        chartOptions: {
          ...DEFAULT_CHART_OPTIONS,
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [
            {
              name: 'Time worked',
              data: this.getPieValues(this.sourceData),
              type: 'pie'
            }
          ]
        }
      },
      {
        title: 'Monthly work done',
        cols: 2,
        rows: 1,
        visible: true,
        chartOptions: {
          ...DEFAULT_CHART_OPTIONS,
          chart: {
            type: 'line'
          },
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ]
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: [
            {
              name: 'Time worked',
              data: this.getMonthlyValues(this.sourceData),
              type: 'line'
            }
          ]
        }
      },
      {
        title: 'Last 7 days',
        cols: 2,
        rows: 1,
        visible: true,
        chartOptions: {
          ...DEFAULT_CHART_OPTIONS,
          chart: {
            type: 'line'
          },
          xAxis: {
            categories: this.getLast7Days().map((date: Date) =>
              date.toJSON().slice(0, 10)
            )
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: [
            {
              name: 'Time worked',
              data: this.getLast7DaysValues(this.sourceData),
              type: 'line'
            }
          ]
        }
      },

      {
        title: 'Task by status',
        cols: 2,
        rows: 1,
        visible: true,
        chartOptions: {
          ...DEFAULT_CHART_OPTIONS,
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: false
              },
              showInLegend: true
            }
          },
          series: [
            {
              name: 'Status',
              data: this.getPieStatus(this.sourceData),
              type: 'pie'
            }
          ]
        }
      }
    ];
  }

  ngAfterViewInit() {
    this.tasksService.taskList$.subscribe(list => {
      this.sourceData = list;
      this.createCards();
      setTimeout(() => {
        this.updateFlag = true;
      });
    });
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {}; // optional function, defaults to null
}
