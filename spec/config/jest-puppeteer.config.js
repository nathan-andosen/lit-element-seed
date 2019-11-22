module.exports = {
  launch: {
    headless: (process.env.HEADLESS === 'yes') ? true : false,
    slowMo: (process.env.SLOW_MO) ? parseInt(process.env.SLOW_MO) : 0,
    args: [
      '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
    ]
  },
  browserContext: 'default',
  setupFilesAfterEnv: ["expect-puppeteer"]
};
