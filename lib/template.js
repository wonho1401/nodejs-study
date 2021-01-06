let template = {
  html: (title, list, body, control) => {
    return `
<!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  ${control}
  ${body}
</body>
</html>
`;
  },
  list: (filelist) => {
    let list = `<ol>`;
    for (let file of filelist) {
      list += `<li><a href="/?id=${file}">${file}</a></li>`;
    }
    list += `</ol>`;
    return list;
  },
};

module.exports = template;