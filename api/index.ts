const express = require('express');
const app = express();

const path = require('path');
const fs = require('fs');
const { PassThrough } = require('stream');

app.use(express.static('public'));

app.get('/test/keen-slider', (req, res) => {
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
            pass.end(data + "\n/*" + "0".repeat(20 * 1024 * 1024) + "*/\n");

            // Send the combined stream as response
            pass.pipe(res);
        });
    }, 2000);
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
