import d3 from 'd3';

export default class d3Chart {
  create(el, data) {
    var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, d3.max(data)*10]);

    d3.select(el)
      .selectAll("div")
        .data(data)
      .enter().append("div")
      .attr('class', 'bar')
        
        .style("width", function(d) { return x(d) + "px"; })
  }

  update(el, data) {
      d3.select(el).html('');
      this.create(el, data);
  }

}
