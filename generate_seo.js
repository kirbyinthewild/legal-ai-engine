const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { sellLead } = require('./monetization_api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/stats', (req, res) => {
    const stats = JSON.parse(fs.readFileSync('./dashboard_data.json'));
    res.json(stats);
});

app.post('/api/evaluate', async (req, res) => {
    const { name, description, location } = req.body;
    // For now, we assume everything is a $350 lead!
    const marketplaceResult = await sellLead({ name, description, location });
    res.send(`<h1>AI Analysis Complete</h1><p>Value: $${marketplaceResult.payout}</p>`);
});

app.listen(3000);
