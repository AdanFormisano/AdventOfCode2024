const fs = require('node:fs');

const list_first = [];
const list_second = [];
let total_diff = 0;

try {
    const data = fs.readFileSync('input', 'utf-8');
    const lines = data.split('\n');

    for (let i = 0; i < lines.length - 1; i++) {
        const ids = lines[i].split('   ');
        list_first.push(Number(ids[0]));
        list_second.push(Number(ids[1]));
    }

    while (list_first.length > 0 && list_second.length > 0) {
        compareLists();
    }

    console.log(`Total difference: ${total_diff}`);
} catch (err) {
    console.error('Error reading file:', err);
}

// Compares the smallest element of each list and calculates the difference
function compareLists() {
    const min_first = Math.min(...list_first);
    const min_second = Math.min(...list_second);

    const diff = Math.abs(min_first - min_second);
    total_diff += diff;

    // console.log(`Min 1: ${min_first}\t Min 2: ${min_second}\t Diff: ${diff}\t Total: ${total_diff}`);

    list_first.splice(list_first.indexOf(min_first), 1);
    list_second.splice(list_second.indexOf(min_second), 1);
}