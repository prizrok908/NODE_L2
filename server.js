
const os = require("os");

function bt4gb(mem) {
  return os.freemem() / 1024 ** 2 > mem;
}

console.log(bt4gb(4));


const dotenv = require('dotenv');
dotenv.config();

console.log(`Имя: ${process.env.FIRST_NAME}`);
console.log(`Фамилия: ${process.env.LAST_NAME}`);
console.log(`Номер группы: ${process.env.GROUP_NUMBER}`);
console.log(`Номер по списку: ${process.env.LIST_NUMBER}`);