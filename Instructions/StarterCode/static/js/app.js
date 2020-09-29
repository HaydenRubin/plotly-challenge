// Step 1: Use the D3 library to read in samples.json
d3.json("samples.json").then(function(data) {
    console.log(data);
})

// Step 2: Create a horizontal bar chart (Day 2 Activity 6 -- in 
// trace: type: "bar", orientation: "h") 
// with a dropdown menu (Day 2 Activity 8) to display the top 
// 10 OTUs (OTU = operational taxonomic units) found in that individual.
    // Use sample_values as the values for the bar chart.
    // Use otu_ids as the labels for the bar chart.
    // Use otu_labels as the hovertext (Day 2 Activity 6 -- in trace:
    // text: data.map(object => object.otu_labels)) for the chart.

// Step 3: Create a bubble chart (Day x Activity y) that displays each sample.
    // Use otu_ids for the x values.
    // Use sample_values for the y values.
    // mode: 'markers',
    // Use sample_values for the marker size.
    // Use otu_ids for the marker colors. 
        // marker: {
        //      color: otu_ids,
        //      size: sample_values
        // }
    // Use otu_labels for the text values.
        // before "mode:" -> text: otu_labels,

function optionChanged(input){
    buildPlot(input);
}

function init() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    d3.json("samples.json").then(function(data){
        data.names.forEach(input => dropdownMenu.append("option").text(input).property("value", input));
    });
}

function buildPlot(person) { // person represented by samples.id
    d3.json("samples.json").then(function(data){

        var filteredOTUs = data.samples.filter(object => object.id === person);

        console.log(filteredOTUs);

        var sample_values = filteredOTUs[0].sample_values;
        var otu_ids = filteredOTUs[0].otu_ids;
        var otu_labels = filteredOTUs[0].otu_labels;

    // console.log(sample_values);

        var trace1 = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(input => `OTU ID: ${input}`).reverse(),
            text: otu_labels.slice(0,10).reverse(), // hovertext
            name: "OTUs",
            type: "bar",
            orientation: "h"
        };
  
        var barplotData = [trace1];
  
  // Apply the group bar mode to the layout
        var layout = {
            title: "Top 10 OTUs found in particular individual",
        };
  
  // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", barplotData, layout); 

        var trace2 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                color: otu_ids,
                size: sample_values,
                colorscale: "Earth"
            }
        };

        var layout2 = {
            title: "Bubble Chart",
        };

        Plotly.newPlot("bubble", [trace2], layout2);

    });

}

buildPlot("940");

init();

// Step 4: Display the sample metadata, i.e., and individual's demographic info.

// 

// Step 5: Display each key-value pair from the metadata JSON object somewhere on the page. 

//

// Step 6: Update all of the plots any time that a new sample is selected (Day 2 Activity 8).

// 