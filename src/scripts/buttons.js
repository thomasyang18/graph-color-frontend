function getFile(event) {
  const input = event.target;
  if ("files" in input && input.files.length > 0) {
    return input.files[0];
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
