import { Component, OnInit } from '@angular/core';
import { ServerHttpService } from './server-http.service';
import * as _ from 'lodash';
import { ChartDataSets, ChartType, ChartOptions} from 'chart.js';
import { Label as ng2Chart } from 'ng2-charts';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Covid19-Angular';
  
  public isDataOpened = false;
  public isUSDataOpened = false;
  public globalData : any[] = [];
  public countriesData: any[] = [];
  public usData : any[]= [];
  public chartIsReady = false;
  public totalColumns = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  public currentTotalColumn = 5;
  public interestedData : any[] = [];
  public countryFilter: any;
  public countryFilterControl = new Subject<string>();
  public countriesDataOriginal : any[] = [];
  public countriesDataColumnName : any[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    title: {
      text: 'LIVE - Chương trình thông báo về Coronavirus - Covid 19',
      display: true,
      fontSize: 20,
    },
    scales: {
      xAxes: [{}],
      yAxes: [{}],
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        // font: {
        //   size: 20,
        // },
        formatter(value: any, context : any) {
          //   return context.chart.data.labels[context.dataIndex];
          // return context.dataIndex + ': ' + Math.round(value * 100) + '%';
          return value.toLocaleString('en-US');
        },
      },
    },
  };
  public barChartLabels: ng2Chart[] = ['2013', '2014', '2015', '2016', '2017', '2018'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins : any[] = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Series A' },
    { data: [28, 48, 40, 19], label: 'Series B' },
    { data: [278, 148, 40, 19], label: 'Series C' },
  ];

  public chartColors: Array<any> = [
    {
      // first color
      backgroundColor: 'rgba(61, 255, 36, 0.84)',
      borderColor: 'rgba(14, 117, 0, 1)',
    },
    {
      // second color
      backgroundColor: 'rgba(26, 219, 0, 0.84)',
      borderColor: 'rgba(14, 117, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 162, 87, 0.8)',
      borderColor: 'rgba(163, 73, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 134, 36, 1)',
      borderColor: 'rgba(117, 53, 0, 1)',
    },
    {
      backgroundColor: 'rgba(255, 46, 46, 0.78)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
    {
      backgroundColor: 'rgba(235, 0, 0, 1)',
      borderColor: 'rgba(255, 26, 26, 0.86)',
    },
  ];
  
  public valueToString(date: any): any {
		if (!date) {
			return '';
		}
		return date.toString();
	}
  public formatCurrency(number: any): any{
    if(!number){
      return 0;
    }
    return Number(number);
      
  }
  constructor(private  serverHttp: ServerHttpService){
    
  }
  ngOnInit(): void {
     this.serverHttp.getSummary().subscribe((data) => {
      // console.log(data);
      this.globalData = data.Global;
      this.countriesData = [];

      for (const row of data.Countries) {
        //  filteredData = Object();
        const filteredData = {
          Country: row.Country,
          CountryCode: row.CountryCode,
          NewConfirmed: row.NewConfirmed,
          NewDeaths: row.NewDeaths,
          NewRecovered: row.NewRecovered,
          TotalConfirmed: row.TotalConfirmed,
          TotalDeaths: row.TotalDeaths,
          TotalRecovered: row.TotalRecovered,
        };
        if (row.CountryCode === 'US') {
          this.interestedData.push(filteredData);
        }
        if (row.CountryCode === 'VN') {
          this.interestedData.push(filteredData);
        }
        this.interestedData = _.orderBy(
          this.interestedData,
          ['CountryCode'],
          ['desc']
        );
        this.countriesData.push(filteredData);
      }
      if (
        this.countriesData &&
        this.countriesData.length > 0 &&
        this.countriesData[0].hasOwnProperty('TotalConfirmed')
      ) {
        // TotalDeaths, TotalConfirmed
        this.countriesData = _.orderBy(
          this.countriesData,
          ['TotalConfirmed'],
          ['desc']
        );
        this.countriesDataOriginal = this.countriesData;
        this.countriesDataColumnName = this.countriesDataOriginal[0] || null;
        this.chartIsReady = true;
        this.buildChart();
      }
      
    });

    this.serverHttp.getUSData().subscribe((data) => {
      // console.log(data);
      this.usData = data;
    });

    this.countryFilterControl.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
      this.countryFilter = value.trim().toLowerCase();
      this.countriesData = this.countriesDataOriginal.filter(data => data.Country.toString().toLowerCase().includes(this.countryFilter));
      // console.log(this.countriesData)
    });
    
  }
  public getWord(key: any) {
    const map : any = {
      NewConfirmed: 'New Confirmed',
      TotalConfirmed: 'Total Confirmed',
      NewRecovered: 'New Recovered',
      TotalRecovered: 'Total Recovered',
      NewDeaths: 'New Deaths',
      TotalDeaths: 'Total Deaths',
      CountryCode: 'Country Code',
    };
    return map[key] || key;
  }
  public buildChart() {
    const key = 'Country';
    const keys = [
      'NewConfirmed',
      'TotalConfirmed',
      'NewRecovered',
      'TotalRecovered',
      'NewDeaths',
      'TotalDeaths',
    ];
    let countriesData: any[] = [];
    let records = 0;
    this.barChartLabels = [];
    for (const row of this.countriesData) {
      records++;
      this.barChartLabels.push(row[key]);
      let key2 : any;
      for (key2 of keys) {
        if (!countriesData[key2]) {
          countriesData[key2] = [];
        }
        countriesData[key2].push(row[key2]);
      }
      if (records === this.currentTotalColumn) {
        break;
      }
    }
    this.barChartData = [];
    let key1 : any;
    for(key1 of keys) {
      this.barChartData.push({
        label: `${this.getWord(key1)}`,
        data: countriesData[key1],
        fill: false,
      });
    }
    this.chartIsReady = true;
    // console.log(this.barChartData)
  }

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    // console.log(event, active);
  }

  
  public orderBy(key: any, dir: any){
    this.countriesData  = _.orderBy(this.countriesData , key, dir);
  }
}
