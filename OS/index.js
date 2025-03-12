require("dotenv").config();
const os = require("os");

function getInfo() {
    console.log(`Платформа: ${os.platform()}`);
    console.log(`Свободная память: ${formatSize(os.freemem())}`);
    console.log(`Главная папка: ${os.homedir()}`);
    console.log(`Имя ОС: ${os.hostname()}`);
    console.log("Сеть:");
    const net = os.networkInterfaces();
    for (const [name, addrs] of Object.entries(net)) {
        console.log(`  - ${name}:`);
        addrs.forEach(addr => {
            if (addr.family === "IPv4") {
                console.log(`    Адрес: ${addr.address}, Тип: ${addr.family}`);
            }
        });
    }
}

function formatSize(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}

function Memory4GB() {
    const free = os.freemem();
    const gb4 = 4 * 1024 * 1024 * 1024;
    if (free > gb4) {
        console.log("Свободно > 4GB.");
        return true;
    } else {
        console.log("Свободно <= 4GB.");
        return false;
    }
}

function checkMode(callback) {
    const mode = process.env.MODE;
    if (mode === "admin") {
        console.log("Режим: admin. Разрешено.");
        callback();
    } else if (mode === "user") {
        console.log("Режим: user. Запрещено.");
    } else {
        console.log("Режим неизвестен. Запрещено.");
    }
}

function main() {
    checkMode(getInfo);
    Memory4GB();
}

main();