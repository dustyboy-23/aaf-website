const { spawn } = require('child_process');
spawn('node', ['serve.js', 'dist2', '3458'], { detached: true, stdio: 'ignore' }).unref();
console.log('Server started on port 3458');
