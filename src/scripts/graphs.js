class Graph {
  constructor(filename, text) {
    this.filename = filename;

    let ints = text.split(/\W+/).map((e) => parseInt(e));
    this.num_nodes = ints[0];
    this.edges = [];
    this.adj = [...Array(this.num_nodes + 1).keys()].map(function (e) {
      return [];
    }); /* adjacency list, dummy 0 index */

    this.nodes = [...Array(this.num_nodes).keys()].map(function (e) {
      return { id: e + 1 }; // because this is zero indexed
    });
    for (let i = 1; i < ints.length; i += 2) {
      this.addEdge(ints[i], ints[i + 1]);
    }
  }

  reset() {
    this.nodes = [...Array(this.num_nodes).keys()].map(function (e) {
      return { id: e + 1 }; // Removing colors
    });
  }

  isNeighbors(u, v) {
    return this.adj[u].includes(v);
  }

  neighbors(u) {
    return this.adj[u];
  }

  addEdge(u, v) {
    if (!this.isNeighbors(u, v)) {
      this.edges.push({ from: u, to: v });
      this.adj[u].push(v);
      this.adj[v].push(u);
    }
  }
}

function generateGraph(graph) {
  // id
  let graphcopy = [...graph.nodes];

  graphcopy.map((e) => {
    if (!Number.isInteger(e["color"])) e["color"] = e["id"];
    e["label"] = `${e["color"]}`;
    return e;
  });

  // color gen

  const saturation = "85%";
  const lightness = "70%";
  graphcopy.map((e) => {
    e["color"] = `hsl(${
      (e["color"] * 137) % 360
    }, ${saturation}, ${lightness})`;
  });

  // create an array with nodes

  let nodes = new vis.DataSet(graphcopy);

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
    selectedProgram = -1;
    parent.children().each(function (i, obj) {
      obj.style.backgroundColor = "palegreen";
      if (selectedGraph === i) obj.style.backgroundColor = "red";
      generateGraph(graphs[selectedGraph]);
    });
  });

  selectedGraph = -1;
}

function appendGraph(event) {
  const files = getFiles(event);
  files.forEach((file) =>
    readFileContent(file).then((content) => {
      const graph = new Graph(file.name, content);
      modifyGraphList("push", graph);
    })
  );
}
