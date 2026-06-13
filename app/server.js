const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('<h1>This is group4 capstone project</h1><p>Time stamp presentation7:02pm Naija time successfully via CI/CD + Docker + terraform</p>');
});
app.get('/health', (req, res) => res.json({ status: 'OK', platform: 'Azure' }));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
