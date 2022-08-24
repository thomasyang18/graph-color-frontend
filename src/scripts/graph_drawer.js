// create an array with nodes
var nodes = new vis.DataSet([
  { id: 1, label: "Node 1", color: "red" },
  { id: 2, label: "Node 2", color: "blue" },
  { id: 3, label: "Node 3", color: "green" },
  { id: 4, label: "Node 4", color: "orange" },
  { id: 5, label: "Node 5", color: "black" },
]);

// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
]);

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
