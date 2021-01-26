const csv = require('csv-parser');
const fs = require('fs');


const canada_data_file = "canada.txt"
const usa_data_file = "usa.txt"
const title = "country,year,population"

fs.unlink(canada_data_file, (err) => {
  if (err) {
     return console.error(err);
  }
  console.log("Canada File deleted successfully!");
});
fs.unlink(usa_data_file, (err) => {
  if (err) {
     return console.error(err);
  }
  console.log("USA File deleted successfully!");
});
var canada_stream = fs.createWriteStream(canada_data_file, {'flags': 'a'});
canada_stream.once('open', (fd) => {
  canada_stream.write(title+"\r\n");
});
var usa_stream = fs.createWriteStream(usa_data_file, {'flags': 'a'});
usa_stream.once('open', (fd) => {
  usa_stream.write(title+"\r\n");
});
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
      if(row.country == 'Canada')
      {
        canada_stream.write(`${row.country},${row.year},${row.population}\r\n`)
      }

      if(row.country == 'United States')
      {
        usa_stream.write(`${row.country},${row.year},${row.population}\r\n`)
      }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

 