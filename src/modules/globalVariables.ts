const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();
const currentDate = date + ' @ ' + time;

export = { currentDate };