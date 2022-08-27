class Program {
  constructor(filename, text) {
    this.filename = filename;
    this.text = text;
  }
}

let programs = [];
let selectedProgram = -1;

function modifyProgramList(op, program) {
  /* do whatever updates here */

  if (op == "push") {
    programs.push(program);
  }

  /* reload programs */

  const parent = $("#listOfPrograms");
  parent.empty();
  programs.forEach((e, i) => {
    const programBoxHtml = `<div class="dataBox programBox">${e.filename}</div>`;
    parent.append(programBoxHtml);
  });

  $(".programBox").click(function (e) {
    if (selectedProgram == $(this).index()) return;
    if (selectedGraph != -1) {
      selectedProgram = $(this).index();
    }
    parent.children().each(function (i, obj) {
      obj.style.backgroundColor = "palegreen";
      if (selectedProgram === i) {
        obj.style.backgroundColor = "red";
        curGraph = graphs[selectedGraph];
        curProgram = programs[selectedProgram];
        let lambda = (graph) => {
          graph.reset();
          eval(curProgram.text);
          generateGraph(graph);
        };
        lambda(curGraph);
      }
    });
  });

  selectedProgram = -1;
}

function appendProgram(event) {
  const files = getFiles(event);
  files.forEach((file) =>
    readFileContent(file).then((content) => {
      const program = new Program(file.name, content);
      modifyProgramList("push", program);
    })
  );
}
