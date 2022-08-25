/* Data structures representing graphs */

class Graph {
  constructor(filename, text) {
    this.filename = filename;

    let ints = text.split(/\W+/).map((e) => parseInt(e));
    this.num_nodes = ints[0];
    this.edges = [];
    this.nodes = [...Array(this.num_nodes).keys()].map(function (e) {
      return { id: e + 1, label: `${e + 1}` }; // because this is zero indexed
    });
    for (let i = 1; i < ints.length; i += 2) {
      this.edges.push({ from: ints[i], to: ints[i + 1] });
    }
  }
}

function generateGraph(graph) {
  // create an array with nodes
  let nodes = new vis.DataSet(graph.nodes);

  // create an array with edges
  let edges = new vis.DataSet(graph.edges);

  // create a network
  let container = document.getElementById("mynetwork");

  // provide the data in the vis format
  let data = {
    nodes: nodes,
    edges: edges,
  };
  let options = {};

  // initialize your network!
  let network = new vis.Network(container, data, options);
}

let graphs = [];
let selectedGraph = -1;

function modifyGraphList(op, graph) {
  /* do whatever updates here */

  if (op == "push") {
    graphs.push(graph);
  }

  /* reload graphs */
  const parent = $("#listOfGraphs");
  parent.empty();
  graphs.forEach((e, i) => {
    const graphBoxHtml = `<div class="dataBox graphBox">${e.filename}</div>`;
    parent.append(graphBoxHtml);
  });

  $(".graphBox").click(function (e) {
    selectedGraph = $(this).index();
    parent.children().each(function (i, obj) {
      console.log("Yo " + i + " " + selectedGraph);
      obj.style.backgroundColor = "palegreen";
      if (selectedGraph === i) obj.style.backgroundColor = "red";
      generateGraph(graphs[selectedGraph]);
    });
  });

  selectedGraph = -1;
}

function appendGraph(event) {
  const file = getFile(event);
  readFileContent(file).then((content) => {
    const graph = new Graph(file.name, content);
    modifyGraphList("push", graph);
  });
}
