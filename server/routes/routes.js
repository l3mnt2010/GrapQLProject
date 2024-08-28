const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/noteExam', (req, res) => {
  try {
    if (!req.user || req.user.admin !== 1) {
      return res.status(403).send("Nope");
    }

    let isResponseSent = false;
    const electronProcess = exec('xvfb-run --auto-servernum --server-args="-screen 0 1024x768x24" npx electron --no-sandbox ./utils/main.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        if (!isResponseSent) {
          isResponseSent = true;
          return res.status(500).send('Error opening Electron.');
        }
      } else {
        console.log(`Electron stdout: ${stdout}`);
        if (!isResponseSent) {
          isResponseSent = true;
          res.send('OK');
        }
      }
    });

    setTimeout(() => {
      electronProcess.kill();
      if (!isResponseSent) {
        isResponseSent = true;
        res.send('OK');
      }
    }, 3000);
    
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send('Server error.');
  }
});

module.exports = router;
