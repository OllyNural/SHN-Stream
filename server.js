const app = require('./index.js');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Express server currently running on port ${PORT}`))