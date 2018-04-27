import { AppComponent } from './../app.component';
import { element } from 'protractor';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public data = [30, 86, 168, 281, 303, 565];
  public data1 = [4, 8, 15, 16, 23, 42];


  private width = 400;
  private barHeight = 20;
  private width2 = 960;
  private height2 = 500;

  private scale = d3.scaleLinear().domain([0, 565]).range([0, 300]);
  private scale1 = d3.scaleLinear().domain([0, d3.max(this.data1)]).range([0, this.width]);
  private scale2 = d3.scaleLinear().range([this.height2, 0]);

  private element: ElementRef;
  constructor(
    private el: ElementRef
  ) {
    this.element = el;
  }

  ngOnInit() {
    const bar = <HTMLElement>this.element.nativeElement.querySelector('div[class="chart"]');
    const bar1 = <HTMLElement>this.element.nativeElement.querySelector('svg[class="chart"]');
    const sec = <HTMLElement>this.element.nativeElement.querySelector('section');
    d3.select(bar)
      .selectAll('.chart div')
      .data(this.data)
      .enter()
      .append('div')
      .style('width', (d) => (this.scale(d) + 'px'))
      .text((d) => d);

    // d3.select(sec).attr('class', 'special').append('div').html('Hello, world!');
    const section = d3.select(sec);
    section.append('div').html('First!');
    section.append('div').html('Second.');

    const chart1 = d3.select(bar1).attr('width', this.width)
      .attr('height', this.barHeight * this.data1.length);
    const b1 = chart1.selectAll('g').data(this.data1).enter().append('g')
      .attr('transform', (d, i) => 'translate(0,' + i * 20 + ')');
    b1.append('rect').attr('width', this.scale1).attr('height', 20 - 1)
      .attr('background-color', '#69a0d6');
    b1.append('text')
      .attr('x', (d) => this.scale1(d) - 3)
      .attr('y', this.barHeight / 2)
      .text((d) => d);

    // this.barChart2();
    // this.practice1();
    // this.practice2();
    // this.practice3();
    // this.practice4();
    this.practice5();
    this.practice6();
    this.practice7();
    this.practice8();
    this.practice9();
    this.practice10();
    // this.refunc();
  }

  refunc() {
    console.log('Normal function');

    // First we save a reference to the original console.log function.
    const original = window['console']['log'];

    // next we create our fake function
    // basicly we check the argument and if match we call original function with otherparam.
    // if there is no match pass the argument to the original function
    const fake = function (argument) {
      if (argument === 'Ka01abs') {
        original('Spoofed!');
      } else {
        original(argument);
      }
    }

    // We redefine now console.log as our fake function
    window['console']['log'] = fake;

    // then we call console.log with any argument
    console.log('This is unaltered');

    // now we should see other text in console different to 'Ka01abs'
    console.log('Ka01abs');

    // Aaaand everything still OK
    console.log('Bye bye!');

  }

  barChart2() {
    const data = [
      { 'name': 'Clover', 'value': 90 },
      { 'name': 'Hsc', 'value': 89 },
      { 'name': 'Kyo', 'value': 85 },
      { 'name': 'Joe', 'value': 30 },
      { 'name': 'Mary', 'value': 60 },
      { 'name': 'Sam', 'value': 70 }
    ];
    const ta = this.element.nativeElement.querySelector('#no2');
    const width = 960;
    const height = 500;
    const x = d3.scaleBand().rangeRound([0, width])
      .domain(data.map((d) => d.name));
    const y = d3.scaleLinear().range([height, 0])
      .domain([0, d3.max(data, (d) => d.value)]);

    const chart = d3.select(ta).attr('width', width).attr('height', height);
    const barWidth = width / data.length;

    const bar = chart.selectAll('g').data(data).enter().append('g')
      .attr('transform', (d) => {
        return 'translate(' + x(d.name) + ', 0)'
      });
    // .attr('transform', (d, i) => {
    //   return 'translate(' + i * barWidth + ', 0)'});

    bar.append('rect')
      .attr('y', (d) => d.value)
      .attr('height', (d) => height - y(d.value))
      .attr('width', x.padding());

    bar.append('text')
      .attr('x', x.bandwidth() / 2)
      .attr('y', (d) => y(d.value) + 3)
      .attr('dy', '.75em')
      .text((d) => d.value);
  }

  practice1() {
    const ta = this.element.nativeElement.querySelector('#no3');
    const circle = d3.select(ta).append('circle');
    circle.attr('r', 10).attr('cx', 20).attr('cy', 23);

    // set css style
    circle.style('stroke-width', 2);

    // add, remove css classes
    circle.classed('highlight', true);
  }

  practice2() {
    const body = d3.select('body');
    body.append('svg').attr('width', 800).attr('height', 600);
    // d3.select('svg').remove();
  }

  practice3() {
    const ta = this.element.nativeElement.querySelector('#no3-1');
    const sg = d3.select(ta).attr('width', 300).attr('height', 300);
    const data = [1, 2, 3, 10, 5, 9, 23];

    // select svg element
    // select all circles - even if there none yet -
    // and bind the data array `data` onto them
    const circles = sg.selectAll('circle').data(data).enter().append('circle')
      .attr('r', 20);

    circles.attr('cx', (d, i) => d * 10).attr('cy', (d, i) => i * 50);
    circles.exit().remove();

  }

  practice4() {
    const ta = this.element.nativeElement.querySelector('#no4');
    const data = [
      { name: 'a', arr: [1, 2, 3] },
      { name: 'b', arr: [3, 2, 4] }
    ];

    const groups = d3.select(ta).selectAll('g').data(data);
    const groups_enter = groups.enter().append('g');
    const groups_update = groups.merge(groups_enter)
      .attr('transform', (d, i) => `translate(${i * 20 + 10}, 10)`);

    // select all circles within each group and bind the inner array per data item.
    const circles = groups_update.selectAll('circle').data((d) => d.arr);

    // normal data-join
    const circles_update = circles.enter().append('circle');

    circles.merge(circles_update)
      .attr('r', (d) => d * 2)
      .attr('cy', (d, i) => i * 20);

    circles.exit().remove();
    groups.exit().remove();

  }

  practice5() {
    // const ta = this.element.nativeElement.querySelector('#id5');
    const svg = d3.select('#id5').append('svg');
    let bandScale: any;
    const dataset = [];

    d3.csv('../../assets/nfl.csv', function (d) {
      dataset.push(d);
    }).then(() => {
      dataset.forEach((d, i) => d.order = i)
      createChart();
    });

    d3.select('input')
      .on('change', toggleSort);

    function createChart() {
      const w = 500;
      const h = 100;
      let bandWidth = 0;
      let heightScale: any;

      const teams = dataset.map((d) => d.Team)

      svg.attr('width', w)
        .attr('height', h);
      bandWidth = w / dataset.length - 1;

      heightScale = d3.scaleLinear()
        .domain([0, 16])
        .range([0, h]);

      bandScale = d3.scaleBand()
        .domain(teams)
        .range([0, w])
        .padding(0.1);

      svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('g')
        .append('rect')
        .attr('x', (d: any, i) => bandScale(d.Team))
        .attr('y', (d: any) => {
          return h - heightScale(d.W)
        })
        .attr('width', (d) => bandScale.bandwidth())
        .attr('height', (d: any) => heightScale(d.W))
        .attr('fill', (d: any) => d.Color)
        .append('title')
        .text((d: any) => d.Team);

      svg.selectAll('g')
        .append('text')
        .attr('x', (d: any, i) => bandScale(d.Team))
        .attr('y', (d: any) => {
          return h - heightScale(d.W) - 10
        })
        .attr('dy', '.5em')
        .attr('dx', '0em')
        .text((d: any) => d.W);
    }

    function toggleSort() {
      let sortComparer;
      if (this.checked) {
        // Sort by wins
        sortComparer = (a, b) => b.W - a.W;
      } else {
        // Sort by original order
        sortComparer = (a, b) => a.order - b.order
      }

      dataset.sort(sortComparer);
      const teamOrder = dataset.map((d: any) => d.Team);

      bandScale.domain(teamOrder);

      svg.transition()
        .duration(500)
        .selectAll('rect')
        .delay((d, i) => i * 50)
        .attr('x', (d: any) => bandScale(d.Team));

      svg.transition()
        .duration(500)
        .selectAll('text')
        .delay((d, i) => i * 50)
        .attr('x', (d: any) => bandScale(d.Team));
    }
  }   // practice 5

  practice6() {
    const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
    /*     const dataset = [];
        const act = Observable.timer(0, 5000);
        act.subscribe( () => {

        }); */

    const svgWidth = 500, svgHeight = 300, barPadding = 5;
    const barWidth = (svgWidth / dataset.length);

    const svg = d3.select('#id6')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgHeight - 5]);

    /* const teams = dataset.map((d, i) => i.toString());
    const bandScale = d3.scaleBand().domain(teams).range([0, svgWidth]); */

    const barChart = svg.selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('y', (d) => svgHeight - yScale(d))
      .attr('height', (d) => yScale(d))
      .attr('width', barWidth - barPadding)
      // .attr('x', (d, i) => bandScale(i.toString()));
      .attr('transform', (d, i) => {
        const translate = [barWidth * i, 0];
        return `translate(${translate})`;
      })
      .attr('fill', '#69a0d6');

    const text = svg.selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text((d) => d)
      .attr('y', (d, i) => svgHeight - yScale(d) + 12)
      .attr('x', (d, i) => barWidth * i)
      .attr('fill', '#000');
  }

  /**
   * Draw Axes with D3.
   */
  practice7() {
    const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

    const svgWidth = 500, svgHeight = 300, barPadding = 5;
    const barWidth = (svgWidth / dataset.length);

    const svg = d3.select('#id7')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const XaxesScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([0, svgWidth - 40]);

    const YaxesScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)])
      .range([svgHeight - 30, 0])

    // draw x axes and y axes.
    const x_axis = d3.axisBottom(XaxesScale);
    const y_axis = d3.axisLeft(YaxesScale);

    svg.append('g')
      .attr('transform', 'translate(30, 10)')
      .call(y_axis);

    const xAxisTranslate = svgHeight - 20;
    svg.append('g')
      .attr('transform', `translate(30, ${xAxisTranslate})`)
      .call(x_axis);
  }

  /**
   * SVG elements.
   */
  practice8() {
    const svgWidth = 600, svgHeight = 500;
    const svg = d3.select('#id8')
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .attr('class', 'svg-container');

    const line = svg.append('line')
      .attr('x1', 100)
      .attr('y1', 50)
      .attr('x2', 500)
      .attr('y2', 50)
      .attr('stroke', 'red')
      .attr('stroke-width', 5);

    const rect = svg.append('rect')
      .attr('x', 100)
      .attr('y', 100)
      .attr('width', 200)
      .attr('height', 100)
      .attr('fill', '#9B95FF');

    const circle = svg.append('circle')
      .attr('cx', 200)
      .attr('cy', 300)
      .attr('r', 80)
      .attr('fill', '#69a0d6');
  }

  /**
   * pie-chart
   */
  practice9() {
    const data = [
      { 'platform': 'Android', 'percentage': 40.11 },
      { 'platform': 'Windows', 'percentage': 10.06 },
      { 'platform': 'IOS', 'percentage': 39.69 }
    ];

    const data1 = [1, 2, 10, 5, 9, 7, 3, 2]

    const svgWidth = 500, svgHeight = 300,
      radius = Math.min(svgWidth, svgHeight) / 2;

    const svg = d3.select('.pie-chart')
      .attr('width', svgWidth)
      .attr('height', svgHeight)

    // create group element to hold pie chart
    const g = svg.append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d: any) => d.percentage);

    const path = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    const arc = g.selectAll('arc')
      .data(pie(<any>data))
      .enter()
      .append('g');

    arc.append('path')
      .attr('d', <any>path)
      .attr('fill', (d: any) => {
        return color(d.data.percentage); });

    const label = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

    arc.append('text')
      .attr('transform', (d: any) => 'translate(' + label.centroid(d) + ')')
      .attr('text-anchor', 'middle')
      .text(
      (d: any, i) => {
        return d.data.platform + ':' + d.data.percentage + '%'
      });

    const ta = this.element.nativeElement.querySelector('#piechart');
    const legend = d3.select(ta)
      .append('div')
      .attr('class', 'legend')
      .style('margin-top', '30px');

    const keys = legend.selectAll('.key')
      .data(data)
      .enter().append('div')
      .attr('class', 'key')
      .style('display', 'flex')
      .style('align-items', 'center')
      .style('margin-right', '20px');

    keys.append('div')
      .attr('class', 'symbol')
      .style('height', '10px')
      .style('width', '10px')
      .style('margin', '5px 5px')
      .style('background-color', (d: any, i) => color(d.percentage));

    keys.append('div')
      .attr('class', 'name')
      .text((d: any) => `${d.platform} (${d.percentage})`);
  }

  /**
   * Line chart
   */
  practice10() {
    // API to fetch historical data of Bitcoin Price Index
    const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
    let parsedData: any;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        parsedData = parseData(data);
        drawChart(parsedData);
      })
      .catch((err) => console.log(err))

    function parseData(data: any) {
      const arr = [];
      let i: any;
      for ( i in data.bpi) {
        if (i) {
          arr.push({
            date: new Date(i),
            value: +data.bpi[i]
          });
        }
      }
      return arr;
    }   // end of parseData

    function drawChart(data: any) {

      const svgWidth = 600, svgHeight = 400;
      const margin = {top: 20, right: 20, bottom: 30, left: 50};
      const width = svgWidth - margin.left - margin.right;
      const height = svgHeight - margin.top - margin.bottom;
      let xdate: Array<any>;
      xdate = d3.extent(data.map((d) => d.date)) ;
      let yvalue: Array<any>;
      yvalue = d3.extent(data.map((d) => d.value));

      const svg = d3.select('.line-chart')
        .attr('width', svgWidth)
        .attr('height', svgHeight)

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const x = d3.scaleTime()
        .domain(xdate)
        .rangeRound([0, width]);

      const y = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain(yvalue);

      const line = d3.line()
        .x((d: any) => x(d.date))
        .y((d: any) => y(d.value))

      g.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .select('.domain');

      g.append('g')
        .call(d3.axisLeft(y))
        .append('text')
        .attr('fill', '#000')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Price ($)');

      g.append('path')
        // .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line(data));
    }
  }
}
