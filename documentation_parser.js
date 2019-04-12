const fs = require('fs');

const dataFilePath = './routes_documentation.json';
const readmeFilePath = './README.md';

fs.readFile(dataFilePath, (err, data) => {
  if (err) throw err;

  jsonData = JSON.parse(data);

  let tableHeader = createTableHeaders(jsonData.table_headers);
  let tableBody = createTableBody(jsonData.items);

  let tableContent = tableHeader + '\n' + tableBody;
  
  fs.writeFile(readmeFilePath, tableContent, (err) => {
    if (err) throw err;
    console.log(`${readmeFilePath} written successfuly`);
  });
});


function createTableBody(items) {
  let result = '|';

  items.forEach((item) => {
    result += `**${item.route}** - ${item.method}|`;

    if (item.hasOwnProperty('headers')) {
      for (let key in item.headers) {
        result += `**${key}**: \`${item.headers[key]}\`<br/>`;
      }
      result += '|';
    } else {
      result += '-|';
    }

    if (item.hasOwnProperty('body')) {
      result += `Type: ${item.body.type}<br/>`
      for (let key in item.body.fields) {
        result += `**${key}**: ${item.body.fields[key]}<br/>`
      }
      // result += 'Example:<br/>';
      // result += '```' + JSON.stringify(item.body.example) + '```';
      result += '|';
    } else {
      result += '-|';
    }

    if (item.hasOwnProperty('responses')) {
      for (let key in item.responses) {
        result += `**${key}**: ${item.responses[key]}<br/>`;
      }
      result += '|';
    } else {
      result += '-|';
    }

    if (item.hasOwnProperty('description')) {
      result += item.description + '|';
    } else {
      result += '-|';
    }

    result += '\n';
  });

  return result;
}

function createTableHeaders(headers) {
  let result = '|';

  headers.forEach(header => result += title(header) + '|');
  result += '\n|';
  headers.forEach(header => result += '-'.repeat(header.length) + '|');
  
  return result;
}

function title(str) {
  let words = str.split(' ').map(word => word.toLowerCase());
  words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return words.join(' ');
}