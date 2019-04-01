const fs = require('fs');

fs.readFile('/home/nikola/text.txt', (err, data) => {
  if (err) return console.error(err);
  const text = data.toString();

  return console.log(text);
});
