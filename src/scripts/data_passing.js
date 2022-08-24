/* This file handles all the data passing stuff through a global graph state. Also handles text file parsing and stuff*/

globNodes = null;
globEdges = null;
num_nodes = 0;

function getFromGraphTextBox() {
  var text = $("#GraphTextBox").val();
  var ints = text.split(/\W+/).map((e) => parseInt(e));
  num_nodes = ints[0];
  globEdges = [];
  globNodes = [...Array(num_nodes).keys()].map(function (e) {
    return { id: e + 1, label: `${e + 1}` }; // because this is zero indexed
  });
  console.log(globNodes);
  for (var i = 1; i < ints.length; i += 2) {
    globEdges.push({ from: ints[i], to: ints[i + 1] });
    console.log(ints[i] + " " + ints[i + 1]);
  }
}

function generateGraph() {
  // create an array with nodes
  var nodes = new vis.DataSet(globNodes);

  // create an array with edges
  var edges = new vis.DataSet(globEdges);

  // create a network
  var container = document.getElementById("mynetwork");

  // provide the data in the vis format
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {};

  // initialize your network!
  var network = new vis.Network(container, data, options);
}
