// Belly Button Biodiversity -- Module 14 Assignment (Plotly.js)

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Have the D3 library read the JSON data
d3.json(url).then(function(data) {
    console.log(data);
});

// Initialize the dashboard at start up
function init() {

    // Use D3 to select the drop down menu
    let dropdownMenu = d3.select("#selDataSet")

    // Have D3 get sample names and populate the drop-down selector
    d3.json(url).then((data) => {

        // Set a variable for the sample name
        let names = data.names;

        // Add samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value", id);
        });

        // Set the first sample from the list
        let sample_one = names[0];

        // Log the value of sample_one
        console.log(sample_one);

        //Build the initial plots
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });

};

// Create a function that populates the metadata info
function buildMetadata(sample) {

    // Use D3 to retreive all the data
    d3.json(url).then((data) => {

        // Retrieve all of the metadata
        let metadata = data.metadata;

        // Have a filter based on the values of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of the metadata objects after they have been filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out the metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are appended to the metadata panel
            console.log(key, value);

            d3. select("#sample-metadata").apped("h5").text('${key}: ${value}');
        });

    });
};

// Create a function that builds the bar chart
function buildBarChart(sample) {

    // Use D3 to retreive the entirety of the data
    d3.json(url).then((data) => {

        // Retreive the sample data
        let sampleData = data.samples;

        // Create a filter based on the values of the sample 
        let value = sampleData.filter(result => result.id == sample);

        // Gather the first index from the array
        let valueData = value[0];

        // Gather the otu_ids, labels, and the sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Log the data to the console
        console.log(otu_ids, otu_labels, sample_values);

        // Set the top ten items to the display in descending order
        let yticks = otu_ids.slice(0,10).map(id => 'OTU ${id}').reverse();
        let xticks = sample_values.slice(0.10).reverse();
        let labels = otu_labels.slice(0,10).reverse();

        // Set up the trace for the bar chart
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Create the layout
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Create a function that builds the bubble chart
function buildBubbleChart(sample) {

    // Use D3 to retrieve the sample data
    let sampleInfo = data.samples;

    // Filter based on the values of the sample
    let value = sampleInfo.filter(result => result.id == sample);

    // Gather the first index from the array
    let valueData = value[0];

    // Gather the otu_ids, labels, and the sample values
    let otu_ids = valueData.otu_ids;
    let otu_labels = valueData.otu_labels;
    let sample_values = valueData.sample_values;

    // Log the data to the console
    console.log(otu_ids, otu_labels, sample_values);

    // Set up the trace for the bubble chart
    let trace_b = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: "markers",
        marker: {
            size: sample_values,
            color: otu_ids,
            colorscale: "Earth"
        }
    };

    // Create the layout
    let layout = {
        title: "Bacteria Per Sample",
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
    };

    // Call Plotly to have it plot the bubble chart
    Plotly.newPlot("bubble", [trace_b], layout)

}