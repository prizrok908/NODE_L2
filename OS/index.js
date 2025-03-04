require("dotenv").config();
const os = require("os");

function getOSInfo() {
    console.log(`Платформа: ${os.platform()}`);
    console.log(`Свободная память: ${formatBytes(os.freemem())}`);
    console.log(`Главная директория: ${os.homedir()}`);
    console.log(`Имя ОС: ${os.hostname()}`);
    console.log("Сетевые интерфейсы:");
    const networkInterfaces = os.networkInterfaces();
    for (const [interfaceName, addresses] of Object.entries(networkInterfaces)) {
        console.log(`  - Интерфейс: ${interfaceName}`);
        addresses.forEach(addr => {
            if (addr.family = "IPv4") {
                console.log(`    Адрес: ${addr.address}, Семейство: ${addr.family}`);
            }
        });
    }
}

function formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let i = 0;
    while (bytes >= 1024 && i < units.length - 1) {
        bytes /= 1024;
        i++;
    }
    return `${bytes.toFixed(2)} ${units[i]}`;
}

function hasMoreThan4GBFreeMemory() {
    const freeMemory = os.freemem();
    const fourGB = 4 * 1024 * 1024 * 1024;
    if (freeMemory > fourGB) {
        console.log("Свободная память больше 4GB.");
        return true;
    } else {
        console.log("Свободная память меньше или равна 4GB.");
        return false;
    }
}

function checkAccessMode(callback) {
    const mode = process.env.MODE;
    if (mode == "admin") {
        console.log("Режим доступа: admin. Разрешено выполнение функции.");
        callback();
    } else if (mode == "user") {
        console.log("Режим доступа: user. Доступ к функции запрещен.");
    } else {
        console.log("Неизвестный режим доступа. Доступ к функции запрещен.");
    }
}

function main() {
    checkAccessMode(getOSInfo);

    hasMoreThan4GBFreeMemory();
}

main();