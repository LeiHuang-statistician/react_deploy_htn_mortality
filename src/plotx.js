import * as d3 from 'd3';
import * as d3v4 from 'd3v4'



function plotx(data,title, ymax,leg,ltext){
  var isSvg1 = document.getElementsByClassName('svg1');
  if(isSvg1){d3.select(".svg1").remove();}
    // set the dimensions and margins of the graph
    //var margin = {top: 30, right: 20, bottom: 50, left: 150};
    var margin = { top: 20, right: 160, bottom: 150, left: 150};
    var widthA = 920;
    var heightA = 700;
    var fontsize=16;

    const innerWidth = widthA - margin.left - margin.right;
    const innerHeight = heightA - margin.top - margin.bottom;


  // append the svg object to the body of the page
  var svg = d3.select('#svgx')
  .attr("width", widthA + margin.left + margin.right)
  .attr("height", heightA + margin.top + margin.bottom)


  var  svg1=svg.selectAll('.svg1').data([1])
  .enter()
  .append('g')
  .attr('class','svg1')
  .attr('transform', `translate(${margin.left+80},${margin.top+30})`)

  
  //console.log(data)

  const yValue = d => d.dying;
  const lastYValue = d =>yValue(d.values[d.values.length - 1]);


  var sumstat = d3v4.nest() 
      .key(d => d.group)
      .entries(data)
      .sort((a, b) =>
        d3.descending(lastYValue(a), lastYValue(b))
      );
   
  //console.log("sumstat",sumstat)
 
  //**************************************scale xAxis 
  const offy=30
  // var xExtent = d3.extent(data, d => d.time);
  // var xScale = d3.scaleTime().domain(xExtent).range([offy, innerWidth])
  var xScale = d3.scaleLinear().domain([0, 20]).range([offy, innerWidth])

  
  const xAxis = d3.axisBottom()
                 .scale(xScale)
                 .ticks(4)
                 .tickPadding(5);


  const xAxisG=svg1.append("g")
    .attr("class", "yaxis")
    .attr('transform', `translate(0,${innerHeight})`)
    .call(xAxis)
    .attr('x', -innerHeight / 2)
    .attr("y", -60) // a little bit below xAxis
    .attr('transform',`translate(0,${innerHeight+10})`)
    
    xAxisG.selectAll('text')
    .style('font-size',fontsize) 
  //**************************************scale yAxis
  //var yExtent = d3.extent(data, d => d.spending);
  //var yMax=d3.max(data,d=>d.spending)
  //var yScale = d3.scaleLinear().domain(yExtent).range([innerHeight, 0])
  var yScale = d3.scaleLinear().domain([0, ymax]).range([innerHeight, 0])
  
    
  const yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(10)
  

const yAxisG = svg1.append("g")
.attr("class", "axis")
.call(yAxis)
yAxisG.selectAll('text')
      .style('font-size',fontsize) 

//yAxisG.select('.domain').remove();  
//xAxisG.selectAll('text').remove(); 

// //*************************group data and create color scale
  var mediaName = sumstat.map(d => d.key) 
  const colors=['cyan','blue','orange','green','red','purple','brown','pink','gray','olive']
  //const colors=[...d3.schemeCategory10,"#de9ed6"] 
  const colorScale = d3.scaleOrdinal(colors);
//   //console.log('colorscale',d3.schemeCategory10)
//   //console.log('colorscale',colors)
  var color = colorScale.domain(mediaName.map(d => d.key));


  //select path - three types: curveBasis,curveStep, curveCardinal
  // ********************************************main plot
  d3.select(".svg1")
      .selectAll(".line")
      .append("g")
      .attr("class", "line")
      .data(sumstat)
      .enter()
      .append("path")
      .attr("d", function (d) {
          return d3.line()
              .x(d => xScale(d.time))
              .y(d => yScale(d.dying)).curve(d3.curveCardinal)
              (d.values)
      })
      .attr("fill", "none")
      .attr("stroke", d => color(d.key))
      .attr("stroke-width", 1)

            
//******************************************y label
  svg1.append("g")
      .attr('class','ytitle')
      .attr('transform',`translate( -40,${innerHeight/2})`)
      .append('text')
      .text('Cumulative Incidence Rate (%)')
      .attr("transform", "rotate(-90)")
      .attr('fill', 'black')
      .attr("text-anchor", "middle")
      .style('font-size', fontsize)
      .style('font-family','Helvetica')
 
  //******************************************x label
  svg1.append("g")
      .attr('class','xtitle')
      .attr('transform',`translate( ${innerWidth/2},${innerHeight+60})`)
      .append('text')
      .text('Years')
      .attr('fill', 'black')
      .attr("text-anchor", "middle")
      .style('font-size', fontsize)
      .style('font-family','Helvetica')

 
//*******************************append legends
var legend = d3.select(".svg1")
.selectAll('g.legend')
.data(sumstat)
.enter()
  .append("g")
  .attr("class", "legend")



legend.append('line')
  .style("stroke",d => color(d.key))
  .style("stroke-width", 2)
  .attr("x1", 30)
  .attr("y1", (d, i) => i * 20 + 20)
  .attr("x2", 50)
  .attr("y2", (d, i) => i * 20 + 20);


legend.append("text")
    .attr("x", 60)
    .attr("y", (d, i) => i * 20 + 25)
    .text((d,i) => leg[i])
    .style("font-family", "Helvetica")

    //**********************************line text***************/
if (ltext==="Yes") {
  d3.select(".svg1")
    .selectAll(".flag5")
    .append("g")
    .attr("class", "flag5")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.time))
    .attr("y", d => yScale(d.dying))
    .attr("dy", 8)
    .attr("text-anchor", "middle")
    .text(d=>d.flag5==="1"? d.dying.toFixed(2):"")
    .style("fill", "black")
    .style('font-weight', 300)
    .style("font-size", 14)
    .style("font-family", "Helvetica")

  d3.select(".svg1")
    .selectAll(".flag10")
    .append("g")
    .attr("class", "flag10")
    .data(data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.time))
    .attr("y", d => yScale(d.dying))
    .attr("dy", 8)
    .attr("text-anchor", "middle")
    .text(d=>d.flag10==="1"? d.dying.toFixed(2):"")
    .style("fill", "black")
    .style('font-weight', 300)
    .style("font-size", 14)
    .style("font-family", "Helvetica")
}

//************************************append title
d3.select(".svg1")
    .append("text")
    .attr("x", innerWidth/2+offy)
    .attr("y", -20)
    .attr("text-anchor", "middle")
    .text(title)
    .style("fill", "black")
    .style('font-weight', 700)
    .style("font-size", 20)
    .style("font-family", "Helvetica")


  // svg.call(d3.zoom().on('zoom', (event)=>{
  //   svg.attr('transform',event.transform.rescaleY(y))
  // }))

  

//***********************************************download 
      const svgS=document.getElementById("svgx")
      const {x,y,width,height}=svgS.viewBox.baseVal;
      var svgData = document.getElementById("svgx").outerHTML;
      var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
      var svgUrl = URL.createObjectURL(svgBlob);
      const image=document.createElement('img');
      image.src=svgUrl
      //console.log(svgData)
    
      image.addEventListener('load', ()=>{
          const canvas=document.createElement('canvas')
          canvas.width=width;
          canvas.height=height;
          const context=canvas.getContext('2d')
          context.drawImage(image,x,y,width, height)
          //console.log('context',context)
          const link=document.getElementById('link');
          link.href=canvas.toDataURL();
          //console.log(link)
          URL.revokeObjectURL(svgUrl);
      })
    
    
      function printToCart2( ) {
        let popupWinindow;
        let innerContents = document.getElementById("svgx").outerHTML;
        popupWinindow = window.open();
        popupWinindow.document.open();
        popupWinindow.document.write('<body onload="window.print()">' + innerContents );
        popupWinindow.document.close();
      }
      document.querySelector("#download").onclick = function(){
      printToCart2()
      }

}

export default plotx