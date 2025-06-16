const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve everything inside current folder (Faculty-dashboard)
app.use(express.static(__dirname));

// Serve the external Assets folder (one level up)
app.use('/Assets', express.static(path.join(__dirname, '../Assets')));

// Serve Faculty-dashboard.htm on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Faculty-dashboard.htm'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
