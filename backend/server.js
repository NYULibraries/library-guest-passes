const app = require('./app.js');
const PORT = process.env.REACT_APP_PORT || 5000;
const HOST = process.env.REACT_APP_HOST || "0.0.0.0";

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
