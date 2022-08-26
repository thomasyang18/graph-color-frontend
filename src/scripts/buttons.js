function getFiles(event) {
  const input = event.target;
  if ("files" in input && input.files.length > 0) {
    const ret = [...input.files];
    input.value = "";
    return ret;
  }
  return null;
}

function readFileContent(file) {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
}
