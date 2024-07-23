const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/data', (req, res) => {
    request('https://www.luogu.com.cn/contest/169817?_contentOnly=1', (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            const participants = data.currentData.contest.totalParticipants;
            res.json({ participants: participants });
        } else {
            res.status(500).send('Error fetching data');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
