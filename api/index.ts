require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');

// Create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

app.get('/test/keen-slider', (req, res) => {
	// Create a pass-through stream to combine file and extra data
    const pass = new PassThrough();

    // Send the combined stream as response
    pass.pipe(res);

    // Function to send file with additional data
    setTimeout(() => {
        // Read the actual file
		res.setHeader('Content-Type', 'text/javascript');
        const fileStream = fs.createReadStream(path.join(__dirname, '..', 'components', 'keen-slider@6.8.6.min.js'));
        fileStream.pipe(res, { end: false });
        fileStream.on('end', () => {
            res.write("\n/*" + "0".repeat(20 * 1024 * 1024) + "*/\n");  // 20MB of '0' characters as a JavaScript comment
            res.end();
        });
    }, 5000);
});


app.listen(3000, () => console.log('Server ready on port 3000.'));

module.exports = app;
