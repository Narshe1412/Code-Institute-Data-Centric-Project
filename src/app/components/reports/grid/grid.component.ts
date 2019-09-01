import { Component, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import * as Highcharts from 'highcharts';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/model/ITask';

/**
 * Creates a default chart template for all charts on the page
 */
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

  /**
   * Initial value for the grid elements
   */
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

  /**
   * Highcharts configuration
   */
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {}; // required
  updateFlag = false; // optional boolean
  oneToOneFlag = true; // optional boolean, defaults to false
  runOutsideAngularFlag = false; // optional boolean, defaults to false

  constructor(
    private breakpointObserver: BreakpointObserver,
    private tasksService: TasksService
  ) {}

  /**
   * Generates the specific configuration for the Pie chart that holds the data for task status
   * @param data The array of tasks from the application store
   */
  private getPieStatus(data: Task[]) {
    // Transforms the array of tasks in an object of the format
    // { task status name : no. of tasks with this status }
    const dataSeries = data.reduce((acc, cur) => {
      if (!acc[cur.status]) {
        acc[cur.status] = 1;
      } else {
        acc[cur.status]++;
      }
      return acc;
    }, {});

    // And transforms this object into a Highcharst data series
    const mappedSeries = [];
    for (const status in dataSeries) {
      if (dataSeries.hasOwnProperty(status)) {
        mappedSeries.push({ name: status, y: dataSeries[status] });
      }
    }
    return mappedSeries;
  }

  /**
   * Generates the specific configuration for the Pie chart that holds the data for task duration
   * @param data The array of tasks from the application store
   */
  private getPieValues(data: Task[]) {
    // Accumulates the total times for all tasks and maps it to a highcharts series object
    const dataSeries = data.map(task => ({
      name: task.reference,
      y:
        (task.timeWorked.length > 0
          ? task.timeWorked.reduce((acc, cur) => acc + cur.amount, 0)
          : 0) / 1000
    }));
    return dataSeries;
  }
  /**
   * Generates the specific configuration for the line chart that holds the data for task details over a year
   * @param data The array of tasks from the application store
   */
  private getMonthlyValues(data: Task[]) {
    // Array that will hold all monthly data
    const monthlyData = new Array(12).fill(0);
    // Maps the total duration of each task to its corresponding month
    data.forEach(task =>
      task.timeWorked.forEach(time => {
        const month = new Date(time.timestamp).getMonth();
        monthlyData[month] += time.amount / 1000;
      })
    );
    return monthlyData;
  }

  /**
   * Generates the specific configuration for the line chart that holds the data for task details over the last 7 days
   * @param data The array of tasks from the application store
   */
  private getLast7DaysValues(data: Task[]) {
    const last7Days = this.getLast7Days();
    const weeklyData = new Array(7).fill(0);

    // Iterates over all the tasks and map those who have happened in the last 7 days to its corresponding day
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

  /**
   * Generates an array that holds the dates of the last 7 days
   * Should cover leap years, end of the months and end of the years seemlessly
   */
  private getLast7Days() {
    const today = Date.now();
    const arr = new Array(7);

    for (let d = 6, i = 0; d >= 0; d--, i++) {
      arr[i] = new Date(today - d * 24 * 60 * 60 * 1000);
    }
    return arr;
  }

  /**
   * On each change of the data store, execute this function to map the cards to a new updated object
   * triggering Angular change detection
   */
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
    // After data changes
    this.tasksService.taskList$.subscribe(list => {
      // Updates local data store
      this.sourceData = list;
      // Update the cards info
      this.createCards();
      setTimeout(() => {
        // Trigger the update of the charts.
        // This is wrapped in a timeout of zero to execute this code outside the Javascript event loop
        // This guarantees it will be the last execution of the current stack, after all angular change detection
        // code has been executed.
        this.updateFlag = true;
      });
    });
  }

  chartCallback: Highcharts.ChartCallbackFunction = chart => {}; // optional function, defaults to null
}
