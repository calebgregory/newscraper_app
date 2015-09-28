var data;

var margin = {
  top: 30, right: 90, bottom: 30, left: 50
}
  , width = 560 - margin.left - margin.right
  , height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format('%Y-%m-%dT%H:%M:%S.000Z').parse;
var sentimentVal = d => { return d.average; };
var date = d => { return format.parse(d.created); };

var x = d3.time.scale()
  .range([0, width])

var y = d3.scale.linear()
  .range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis().scale(x)
  .orient('bottom').ticks(5);
var yAxis = d3.svg.axis().scale(y)
  .orient('left').ticks(5);

var line = d3.svg.line()
  .interpolate('basis')
  .x(d => { return x(d.date); })
  .y(d => { return y(d.average); });

var svg = d3.select('.graph')
  .append('svg')
    .attr('width', width +margin.left +margin.right)
    .attr('height', height +margin.top +margin.bottom)
  .append('g')
    .attr('transform',
          'translate(' +margin.left +',' +margin.top +')');

d3.xhr('/sourcedata', (err, data) => {
  if(err) throw(err);
  else {

    data = JSON.parse(data.response);

    color.domain(d3.keys(data[0]).filter(key => { return key === 'name'; }));

    data = data.map(d => {
      return {
        date : parseDate(d.created),
        source : d.name,
        average : +d.average
      }
    });

    data = d3.nest().key(d => { return d.source; }).entries(data);

    x.domain([d3.min(data, d => { return d3.min(d.values, d => { return d.date; }); }),
      d3.max(data, d => { return d3.max(d.values, d => { return d.date; }); })]);
    y.domain([d3.min(data, d => { return d3.min(d.values, d => { return d.average; }); }),
      d3.max(data, d => { return d3.max(d.values, d => { return d.average; }); })]);

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' +height +')')
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    var newsSources = svg.selectAll('.source')
        .data(data, d => { return d.key; })
      .enter().append('g')
        .attr('class', 'source');

    newsSources.append('path')
      .attr('class', 'line')
      .attr('d', d => { return line(d.values); })
      .style('stroke', d => { return color(d.key); })

    newsSources.append('text')
      .datum(d => { return { name: d.key, value: d.values[d.values.length - 1]}; })
      .attr('transform', d => { return 'translate(' +x(d.value.date) +',' +y(d.value.average) +')'; })
      .attr('x', 3)
      .attr('dy', '.35em')
      .text(d => { return d.name; });
    //svg.append('g')
      //.attr('class', 'line')
      //.attr('d', valueline(data));
  }
})
