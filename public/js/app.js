//alert('hi');
// var h1 = d3.select('h1');
// console.log(h1.html());
//
// var divs = d3.selectAll('div');
// divs.html('foo');
// var spans = d3
//   .selectAll('div')
//   .attr('foo','bar')
//   .selectAll('span');
// spans.html('foo')
//   .style('color','red')
//   .style('font-size','40px');

// console.log(d3
//   .selectAll('main')
//   .classed('awesome',false)
//   .classed('super-awesome',true)
//   .append('section')
//   .html('<span>another</span>'));

var WIDTH = 800;
var HEIGHT = 800;

d3.select('svg')
  .attr('width',WIDTH)
  .attr('height',HEIGHT);

var yScale = d3.scaleLinear();
yScale.range([HEIGHT, 0]);
yScale.domain([0, 5]);
//console.log(yScale.invert(490));

var xScale = d3.scaleTime();
xScale.range([0, WIDTH]);
xScale.domain([new Date('2016-1-1'), new Date('2017-1-1')]);
//console.log(xScale(new Date('2016-7-1')));

var render = function(){ d3.json('/runs', function(error, data){
  var circles = d3.select('#points').selectAll('circle').data(data, function(datum){
      return datum.id;
  });
  circles.enter()
    .append('circle')
    .attr('r',5)
    .attr('cy',function(datum, index){
      return yScale(datum.distance);
    })
    .attr('cx',function(datum, index){
      return xScale(new Date(datum.date));
    });
    circles.exit().remove();

  d3.selectAll('circle').on('click', function(datum, index){
    d3.event.stopPropagation();
    //d3.select(this).remove();
    d3.request('/runs/'+datum.id)
      .header('Content-Type','application/json')
      .send('DELETE', render);
  });

  d3.selectAll('circle').on('hover', function(datum, index){
    d3.event.stopPropagation();
    d3.select(this).append('rectangle');
  });


    //create the behavior
    var drag = function(d){ //d is the data for the dragged object
      var x = d3.event.x;
      var y = d3.event.y;
      d3.select(this).attr('cx', x);
      d3.select(this).attr('cy', y);
    }

    var dragEnd = function(d){
      var x = d3.event.x;
      var y = d3.event.y;
      var date = xScale.invert(x);
      var distance = yScale.invert(y);
      d.date = date;
      d.distance = distance;
       d3.request('/runs/'+d.id)
        .header('Content-Type','application/json')
        .send('PUT', JSON.stringify(d), render);
    }

    var dragBehavior = d3.drag()
        //.on('start', dragStart)
        .on('drag', drag)
        .on('end', dragEnd);

    d3.selectAll('circle').call(dragBehavior);

  });
};

render();

var lastTransform = null;

d3.select('svg').on('click', function(){
  var x = d3.event.offsetX;
  var y = d3.event.offsetY;

  if(lastTransform != null)
  {
    x = lastTransform.invertX(x);
    y = lastTransform.invertY(y);
  }

  var distance = yScale.invert(y);
  var date = xScale.invert(x);

  var runObject = {
    distance : distance,
    date : date
  };

  d3.request('/runs')
    .header("Content-Type", "application/json")
    .post(JSON.stringify(runObject), render);
    console.log(distance);
    console.log(date);
})

var leftAxis = d3.axisLeft(yScale); //create a left axis based on the yScale
d3.select('svg')
  .append('g') //append a group element
  .attr('id', 'y-axis')
  .call(leftAxis); //apply the axis to it

var bottomAxis = d3.axisBottom(xScale); //create a left axis based on the yScale
d3.select('svg')
  .append('g') //append a group element
//  .select('#xAx')
  .attr('id', 'x-axis')
  .attr('transform', 'translate(0,'+HEIGHT+')')
  .call(bottomAxis); //apply the axis to it

var zoomCallback = function(){
    lastTransform = d3.event.transform; //save the transform for later inversion with clicks
    d3.select('#points').attr("transform", d3.event.transform); //apply transform to g element containing circles
    //recalculate the axes
    d3.select('#x-axis').call(bottomAxis.scale(d3.event.transform.rescaleX(xScale)));
    d3.select('#y-axis').call(leftAxis.scale(d3.event.transform.rescaleY(yScale)));
}
var zoom = d3.zoom().on('zoom', zoomCallback);
d3.select('svg').call(zoom);
