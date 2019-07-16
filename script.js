
request = require('request');
const fs = require('fs');

const appID = '<APP_ID>';
const reportType = '<REPORT_TYPE>';
const apiToken = '<API_TOKEN>';
const from = '<FROM_DATA>';
const to = '<T0_DATE>';
const requestUrl = `https://hq.appsflyer.com/export/${appID}/${reportType}/v5?api_token=${apiToken}&from=${from}&to=${to}`;

request(requestUrl, (error, response, body) => {
  if (error) {
    console.log('There was a problem retrieving data:', error);
  }
  else if (response.statusCode != 200) {
    if (response.statusCode === 404) {
      console.log('There is a problem with the request URL. Make sure that it is correct');
    } else {
      console.log('There was a problem retrieving data:', response.body);
    }
  } else {
    fs.writeFile(`${appID}-${reportType}-${from}-to-${to}.csv`, response.body, (err) => {
      if (err) {
        console.log('There was a problem writing to file: ', err);
      } else {
        console.log('File was saved');
      }
    });
  }
  
});
