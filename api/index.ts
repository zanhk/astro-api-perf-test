const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');

const app = express();
app.use(cors());

app.use(express.static('public'));

const corsOptions = {
    origin: 'https://antares.majestico.it', // Allow this domain
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.get('/test/keen-slider', cors(corsOptions), (req, res) => {
    setTimeout(() => {
        const filePath = path.join(__dirname, '..', 'components', 'keen-slider@6.8.6.min.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.status(500).send("Error reading file.");
                return;
            }

            // Setting Content-Type
            res.setHeader('Content-Type', 'text/javascript');

            // Create a pass-through stream
            const pass = new PassThrough();
            pass.end(data + "\n/*" + "0".repeat(1 * 1024 * 1024) + "*/\n");

            // Send the combined stream as response
            pass.pipe(res);
        });
    }, 2000);
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
