const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { sellLead } = require('./monetization_api');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 1. THE FRONT DOOR (Main Landing Page)
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8"><title>AI Legal Intake</title><script src="https://cdn.tailwindcss.com"></script></head>
        <body class="bg-gray-50 p-10 text-center">
            <h1 class="text-4xl font-bold mb-4">Instant Case Evaluation</h1>
            <p class="mb-8">Describe your incident below for an instant AI review.</p>
            <form action="/api/evaluate" method="POST" class="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
                <input type="text" name="name" placeholder="Your Name" class="w-full mb-4 p-2 border rounded" required>
                <textarea name="description" placeholder="What happened?" class="w-full mb-4 p-2 border rounded" required></textarea>
                <button type="submit" class="w-full bg-blue-600 text-white p-3 rounded font-bold">Start AI Review</button>
            </form>
        </body>
        </html>
    `);
});

// 2. THE DASHBOARD
app.get('/dashboard', (req, res) => {
    res.send('<h1>Revenue Dashboard</h1><p>System Active. Waiting for leads...</p>');
});

// 3. THE ENGINE (Lead Processing)
app.post('/api/evaluate', async (req, res) => {
    const { name, description } = req.body;
    const result = await sellLead({ name, description, location: 'Online' });
    res.send(`<h1>Complete!</h1><p>Value: $${result.payout}</p><a href="/">Back</a>`);
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT);
