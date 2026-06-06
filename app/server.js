const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('<h1>Capstone App project on Azure VM</h1><p>Deployed via CI/CD + Docker + terraform</p>');
});
app.get('/health', (req, res) => res.json({ status: 'OK', platform: 'Azure' }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
