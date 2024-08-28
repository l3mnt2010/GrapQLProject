const express = require('express');
const { exec } = require('child_process');
const router = express.Router();

router.get('/noteExam',(req, res) => {
  try {
  if (!req.user || req.user.admin !== 1) {
     return res.status(403).send("Nope");
  }
  let isResponseSent = false;
  const electronProcess = exec('npx electron ./utils/main.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      if (!isResponseSent) {
        isResponseSent = true;
        return res.status(500).send('Error opening Electron.');
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
    return "success";
  }
  catch (error) {
    return "nope";
  }
});


module.exports = router;
