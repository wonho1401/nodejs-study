let template = {
  html: (
    title,
    list,
    body,
    control,
    authStatusUI = `<a href="/auth/login"> login </a>`
  ) => {
    return `
<!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
  <body>
    ${authStatusUI}
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
      list += `<li><a href="/topic/${file}">${file}</a></li>`;
    }
    list += `</ol>`;
    return list;
  },
};

module.exports = template;
