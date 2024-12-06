const fs = require('node:fs');

const list_first = [];
const list_second = [];
const id_map = new Map();
let total_diff = 0;
let total_similarity = 0;

try {
    const data = fs.readFileSync('input', 'utf-8');
    const lines = data.split('\n');

    for (let i = 0; i < lines.length - 1; i++) {
        const ids = lines[i].split('   ');
        list_first.push(Number(ids[0]));
        list_second.push(Number(ids[1]));

        if (!id_map.has(ids[0])) {
            id_map.set(Number(ids[0]), 0);
        }
    }

    compareLists();
    listsSimilarity();

    console.log(`Total difference: ${total_diff}`);
} catch (err) {
    console.error('Error reading file:', err);
}

// Compares the smallest element of each list and calculates the difference
function compareLists() {
    const tmp_list_first = list_first.slice();
    const tmp_list_second = list_second.slice();

    while (tmp_list_first.length > 0 && tmp_list_second.length > 0) {
        const min_first = Math.min(...tmp_list_first);
        const min_second = Math.min(...tmp_list_second);

        const diff = Math.abs(min_first - min_second);
        total_diff += diff;

        // console.log(`Min 1: ${min_first}\t Min 2: ${min_second}\t Diff: ${diff}\t Total: ${total_diff}`);

        tmp_list_first.splice(tmp_list_first.indexOf(min_first), 1);
        tmp_list_second.splice(tmp_list_second.indexOf(min_second), 1);
    }
}

function listsSimilarity() {
    for (const id of list_second) {
        if (id_map.has(id)) {
            id_map.set(id, id_map.get(id) + 1);
        }
    }

    for (const [key, value] of id_map.entries()) {
        total_similarity += value * key;
    }

    console.log(`Total similarity: ${total_similarity}`);
}