const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/noteExam', (req, res) => {
  try {
    if (!req.user || !req.user.username || !req.user.id || req.user.admin !== 1) {
      return res.status(403).send("nope");
    }

    let isResponseSent = false;
    const electronProcess = exec('xvfb-run --auto-servernum --server-args="-screen 0 1024x768x24" npx electron --no-sandbox ./utils/main.js', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        if (!isResponseSent) {
          isResponseSent = true;
          return res.status(500).send('error');
        }
      } else {
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
    res.status(500).send('error');
  }
});

module.exports = router;
