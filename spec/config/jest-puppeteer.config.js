module.exports = {
  launch: {
    headless: (process.env.HEADLESS) ? true : false,
    // slowMo: 300,
    args: [
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ]
  },
  browserContext: 'default',
  setupFilesAfterEnv: ["expect-puppeteer"]
};
