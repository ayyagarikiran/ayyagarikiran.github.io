
// Retrieve the scenes
var scene1 = d3.select('#scene1')
var scene2 = d3.select('#scene2')
var scene3 = d3.select('#scene3')

// constants
var width = 900
var height = 900

var margin = { top: 10, right: 100, bottom: 50, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

// axis definition
var x = d3.scaleBand()
    .domain([10, 20, 30, 40, 50])
    .range([0, width]);


//Scene 1 
var bar_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")

async function load1() {
    d3.csv("https://raw.githubusercontent.com/ayyagarikiran/ayyagarikiran.github.io/main/VaccineDistribution.csv").then(function (data_given) {

        // constants
        var width = 900
        var height = 550

        var margin = { top: 10, right: 100, bottom: 50, left: 50 },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        var yScene1 = d3.scaleLinear()
                  .domain([0, 200])
                  .range([height, 0]);

        var xScale = d3.scaleBand().range([0, width]).padding(0.4);

        xScale.domain(data_given.map(function(d) { return d.location; }));


        var xAxis = d3.axisBottom()
                      .scale(x)
                      .ticks(5);
        var yAxis = d3.axisLeft()
                      .scale(yScene1)
                      .ticks(10);


        // axis appends
        scene1.append("g")
              .attr("transform", "translate(50,20)")
              .attr("class", "axis")
              .call(yAxis);

        // axis labels
        scene1.append('text')
            .attr('x', -350)
            .attr('y', 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Vaccination per Hundred people')

        scene1.append('text')
            .attr('x', 500)
            .attr('y', 630)
            .attr('text-anchor', 'middle')
            .text('States')


        

        scene1.append("g")
            .attr("transform", "translate(50,550)")
            .attr("class", "axis")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");


        scene1.selectAll("mybar")
            .attr("transform", "translate(50,550)")
            .data(data_given)
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return margin.left + xScale(d.location); })
            .attr("y", function (d, i) { return 10+yScene1(d.total_vaccinations_per_hundred); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d, i) { return (height-yScene1(d.total_vaccinations_per_hundred)); })
            .attr("fill", "#5E4FA2").on("mouseover", function (d, i) {
                var d = d3.select(this).data()[0]
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.location + '\n' + d.total_vaccinations_per_hundred )
                    .style('font-size', '12px')
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}


//Scene2
async function load2() {
    d3.csv("https://raw.githubusercontent.com/ayyagarikiran/ayyagarikiran.github.io/main/VaccineDistribution.csv").then(function (data_given) {


        var width = 900
        var height = 550

        var margin = { top: 10, right: 100, bottom: 50, left: 50 },
            width = 1000 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);


        var yScene2 = d3.scaleLinear()
                   .domain([0, 100])
                   .range([height, 0]);

        xScale.domain(data_given.map(function(d) { return d.location; }));
        yScale.domain([0, d3.max(data_given, function(d) { return d.people_fully_vaccinated_per_hundred; })]);


        var y2Axis = d3.axisLeft()
                       .scale(yScene2)
                       .ticks(10);

        scene2.append("g")
              .attr("transform", "translate(50,20)")
              .attr("class", "axis")
              .call(y2Axis);


        scene2.append('text')
            .attr('x', -350)
            .attr('y', 15)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Vaccination per Hundred people')

        scene2.append('text')
            .attr('x', 500)
            .attr('y', 630)
            .attr('text-anchor', 'middle')
            .text('States')

        scene2.append("g")
            .attr("transform", "translate(50,550)")
            .attr("class", "axis")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");


        scene2.selectAll("mybar")
            .attr("transform", "translate(50,550)")
            .data(data_given)
            .attr("fill", "#66C2A5")
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return margin.left + xScale(d.location); })
            .attr("y", function (d, i) { return 10+yScene2(d.people_fully_vaccinated_per_hundred); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d, i) { return (height-yScene2(d.people_fully_vaccinated_per_hundred)); })
            .attr("fill", "#5E4FA2").on("mouseover", function (d, i) {
                var d = d3.select(this).data()[0]
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(d.location + '\n' + d.people_fully_vaccinated_per_hundred )
                    .style("left", (d3.event.pageX) + "px")
                    .style('font-size', '12px')
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    })
}

//Scene3
var bar_tooltip = d3.select("body")
    .append("div")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "black")
    .style("border-radius", "5px")
    .style("padding", "15px")
    .style("color", "white")


function change(setting) {
    console.log(setting);
    var filePath="https://raw.githubusercontent.com/ayyagarikiran/ayyagarikiran.github.io/main/"+String(setting)+".csv";
    console.log(filePath);
    d3.csv(filePath, function(data) {
    var myarray=[];
    myarray.push(parseInt(data.Administered_Janssen));
    myarray.push(parseInt(data.Administered_Pfizer));
    myarray.push(parseInt(data.Administered_Moderna));
    console.log(myarray);

    var height=500;
    var width=500

    var xScale = d3.scaleBand().range([0, width]).padding(0.4),
            yScale = d3.scaleLinear().range([height, 0]);

    x1=["Janssen","Pfizer","Moderna"]
    xScale.domain(x1);


    var y2 = d3.scaleLinear()
    .domain([0, d3.max(myarray, function(d) { return d; })])
    .range([height, 0]);


    scene3.selectAll("svg > *").remove();

    scene3.append('text')
        .attr('x', -250)
        .attr('y', 10)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Administered')

    scene3.append('text')
        .attr('x', 250)
        .attr('y', 550)
        .attr('text-anchor', 'middle')
        .text('Vaccines')

    scene3.append("g")
            .attr("transform", "translate(50,500)")
            .attr("class", "axis")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");

    scene3.append("g")
         .attr("transform", "translate(80,0)")
         .call(d3.axisLeft(y2).tickFormat(function(d){
             return d;
         }).ticks(10));

    scene3.selectAll("mybar")

            .attr("transform", "translate(50,50)")
            .data(myarray)
            .attr("fill", "#66C2A5")
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return margin.left+50+150*(i); })
            .attr("y", function (d, i) { return y2(myarray[i]); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d, i) { return (height-y2(myarray[i])); })
            .attr("fill", "#5E4FA2").on("mouseover", function (d, i) {
                var d = d3.select(this).data()[0]
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(myarray[i])
                    .style("left", (d3.event.pageX) + "px")
                    .style('font-size', '12px')
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });


    //vaccine according to ages

    var myarray1=[];
    myarray1.push(parseInt(data.Admin_Per_100k_12Plus));
    myarray1.push(parseInt(data.Admin_Per_100k_18Plus));
    myarray1.push(parseInt(data.Admin_Per_100k_65Plus));
    console.log(myarray);


    var y_ages = d3.scaleLinear()
    .domain([0, d3.max(myarray1, function(d) { return d; })])
    .range([height, 0]);

    x1=["12+","18+","65+"]
    xScale.domain(x1);


    scene3.append('text')
        .attr('x', 800)
        .attr('y', 550)
        .attr('text-anchor', 'middle')
        .text('Age Group')

    scene3.append('text')
        .attr('x', -250)
        .attr('y', 520)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Administered per 100K')


    scene3.append("g")
            .attr("transform", "translate(600,500)")
            .attr("class", "axis")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-30)")
            .style("text-anchor", "end");

    scene3.append("g")
         .attr("transform", "translate(600,0)")
         .call(d3.axisLeft(y_ages).tickFormat(function(d){
             return d;
         }).ticks(10));

    scene3.selectAll("mybar")

            .attr("transform", "translate(600,50)")
            .data(myarray1)
            .attr("fill", "#66C2A5")
            .enter()
            .append("rect")
            .attr("x", function (d, i) { return margin.left+600+150*(i); })
            .attr("y", function (d, i) { return y_ages(myarray1[i]); })
            .attr("width", xScale.bandwidth())
            .attr("height", function (d, i) { return (height-y_ages(myarray1[i])); })
            .attr("fill", "#5E4FA2").on("mouseover", function (d, i) {
                bar_tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                bar_tooltip.html(myarray1[i])
                    .style("left", (d3.event.pageX) + "px")
                    .style('font-size', '12px')
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                bar_tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
         

});
}