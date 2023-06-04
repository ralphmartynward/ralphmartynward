// Import the necessary libraries
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const Handlebars = require('handlebars');

// SCOPES declaration
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Load client secrets from a local file
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  fs.readFile('token.json', (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      fs.writeFile('token.json', JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', 'token.json');
      });
      callback(oAuth2Client);
    });
  });
}


function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1CowHus8Vx2IQuStCRgcsWQ65xpjgm_Nn_FEeXOgwZgw',
      range: "CV - what I've done!A1:J1000",
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        console.log('Fetched data:', JSON.stringify(rows, null, 2));
  
        // Parse the data into a format that Handlebars can use
        const jobs = rows.map((row) => ({
            date: row[0],
            company: row[2],
            where: row[3],
            position: row[7],
            role: row[8],
            tasks: row[9],
        }));
        
  
        // Read the template
        fs.readFile('input.html', 'utf-8', (err, templateData) => {
            if (err) {
              console.error('There was an error reading the file:', err);
              return;
            }
          
            fs.readFile('index.html', 'utf-8', (err, indexData) => {
              if (err) {
                console.error('There was an error reading the file:', err);
                return;
              }
          
              // Compile and apply template
              const template = Handlebars.compile(templateData);
              const experienceHtml = template({ jobs: jobs });
          
              // Replace {{experience}} in index.html with the generated content
              const finalHtml = indexData.replace('{{experience}}', experienceHtml);
          
              // Write the updated content to index.html
              fs.writeFile('index.html', finalHtml, err => {
                if (err) {
                  return console.error('There was an error writing the file:', err);
                }
                console.log('Resume updated successfully.');
              });
            });
          });
      }
    });
  }
  
            