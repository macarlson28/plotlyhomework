function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(sample){
    var metadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metadata.innterHTML = '';
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    Object.entries(sample).forEach(function([key, value]))
      var row = metadata.append("p");
      row.text(`${key}: ${value}`);

  });
}
)};
//   for(var key in data) {
//     header = document.createElement("h6");
//     header_text = document.createTextNode(`${key}: ${data[key]}`);
//     header.append(header_text);
//     metadata.appendChild(header);
//   }
//     // BONUS: Build the Gauge Chart
//     // buildGauge(data.WFREQ);
// }

function buildCharts(sample) {
  var url = `/samples/${sample}`;
  d3.json(url).then(function(data) {
    var xvalue = data.otu_ids;
    var yvalue = data.sample_values;
    var size = data.sample_values;
    var colors = data.otu_ids;
    var values = data.otu_labels;

    var trace1 = {
      x: xvalue,
      y: yvalue,
      text: values,
      mode: 'markers',
      marker: {
        color: colors, 
        size: size
      }
    };

    var data = [trace1];
    var layout = {
      xaxis: { title: "OTU ID"},
    };

    Plotly.newPlot('bubble', data, layout);
  // })
  // var lables = sample[0]['otu_ids'].map(function(item) {
  //   return otuData[item]
  // });
  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data
  // var bubble_chart = {
  //   margin: {t:0},
  //   hovermode: 'closest',
  //   xaxis: {title: 'OTU_ID'}
  // };
  // var bubble_data = [{
  //   x: sample[0]['otu_ids'],
  //   y: sample[0]['sample_values'],
  //   text: sample[0]['otu_lables'],
  //   mode: 'markers',
  //   marker: {
  //     size: sample[0]['sample_values'],
  //     color: sample[0]['otu_ids'],
  //     colorscale:"Jet",
  //   }
  // }];
  
  // var bubble = document.getElementById('bubble');
  // Plotly.plot(bubble, bubble_data, bubble_chart);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
  d3.json(url).then(function(data) {
    var pie_values = data.sample_values.slice(0, 10);
    var pie_lables = data.otu_ids.slice(0, 10);
    var pie_hover = data.otu_labels.slice(0, 10);

    var data = [{
      values: pie_values,
      lables: pie_lables,
      hovertext: pie_hover,
      type: 'pie'
    }];

    Plotly.newPlot('pie', data);
  });
});
}

//   var pie_chart = [{
//     values: sample[0]['sample_values'].slice(0, 10),
//     lables: sample[0]['otu_ids'].slice(0, 10),
//     hovertext: sample[0]['otu_lables'].slice(0, 10),
//     hoverinfo: 'hovertext',
//     type: 'pie'
//   }];
//   var pie_layout = {
//     margin: { t: 0, l: 0}
//   };
//   var pie_plot = document.getElementById('pie');
//   Plotly.plot(pie_plot, pie_chart, pie_layout);
// };

// function update_chart(sample, otu_data){
//   var sample_values = sample[0]['sample_values'];
//   var otu_ids = sample[0]['otu_ids'];
//   var otu_lables = sample[0]['otu_labels'];
  
//   var bubble = document.getElementById('bubble');
//   Plotly.restyle(bubble, 'x', [otu_ids]);
//   Plotly.restyle(bubble, 'y', [sample_values]);
//   Plotly.restyle(bubble, 'text', [otu_lables]);
//   Plotly.restyle(bubble, 'marker.size', [sample_values]);
//   Plotly.restyle(bubble, 'marker.color', [otu_ids]);

//   var pie_plot = document.getElementById('pie');
//   var update_pie = {
//     values: [sample_values.slice(0, 10)],
//     lables: [otu_ids.slice(0, 10)],
//     hovertext: [otu_lables.slice(0, 10)],
//     hoverinfo: 'hovertext',
//     type: 'pie'
//   };
//   plotly.restyle(pie_plot, update_pie);
// };

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
