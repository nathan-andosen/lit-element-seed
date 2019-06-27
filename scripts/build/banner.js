const package = require('../../package.json');

const now = new Date();
const year = now.getFullYear();
let month = now.getMonth() + 1;
month = (month.toString().length === 1) ? '0' + month : month;
let day = now.getDate();
day = (day.toString().length === 1) ? '0' + day : day;

const banner = `// ${package.name} v${package.version} | ${year}-${month}-${day}`;

module.exports = banner;