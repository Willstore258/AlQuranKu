// Array nama Juz berdasarkan Surah awal (standar mushaf)
const juzNames = [
    "Al-Fatihah - Al-Baqarah",
    "Al-Baqarah",
    "Al-Baqarah - Ali 'Imran",
    "Ali 'Imran - An-Nisa",
    "An-Nisa - Al-Ma'idah",
    "Al-Ma'idah - Al-An'am",
    "Al-An'am - Al-A'raf",
    "Al-A'raf - Al-Anfal",
    "Al-Anfal - At-Taubah",
    "At-Taubah - Hud",
    "Hud - Yusuf",
    "Yusuf - Ibrahim",
    "Al-Hijr - An-Nahl",
    "Al-Isra - Al-Kahf",
    "Maryam - Ta Ha",
    "Al-Anbiya - Al-Hajj",
    "Al-Mu'minun - An-Nur",
    "Al-Furqan - Asy-Syu'ara",
    "An-Naml - Al-Qashash",
    "Al-'Ankabut - Al-Ahzab",
    "Saba - Ya Sin",
    "Ash-Shaffat - Az-Zumar",
    "Ghafir - Fussilat",
    "Asy-Syura - Az-Zukhruf",
    "Ad-Dukhan - Al-Jasiyah",
    "Al-Ahqaf - Az-Zariyat",
    "Az-Zariyat - Al-Hadid",
    "Al-Mujadilah - At-Tahrim",
    "Al-Mulk - Al-Insyiqaq",
    "Al-Mutaffifin - An-Nas"
];

// Event listeners untuk navigasi
document.getElementById('juz-btn').addEventListener('click', () => showSection('juz-list', loadJuz));
document.getElementById('surah-btn').addEventListener('click', () => showSection('surah-list', loadSurah));
document.getElementById('tajwid-btn').addEventListener('click', () => showSection('tajwid-section'));

// Fungsi umum
function showSection(id, callback) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    if (callback) callback();
}

// Load Juz (30 Juz dalam urutan standar dengan nama Surah awal)
function loadJuz() {
    const content = document.getElementById('juz-content');
    content.innerHTML = '';
    for (let i = 1; i <= 30; i++) {
        content.innerHTML += `<div class="juz-item" onclick="loadJuzDetail(${i})">Juz ${i} (${juzNames[i-1]})</div>`;
    }
}

function loadJuzDetail(juz) {
    // Fetch ayat dari Juz dalam urutan mushaf
    fetch(`https://api.alquran.cloud/v1/juz/${juz}`)
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById('juz-content');
            content.innerHTML = `<h3>Juz ${juz} (${juzNames[juz-1]})</h3>` + data.data.ayahs.map(ayah => `
                <div class="surah-item">
                    <p class="arab-text">${ayah.text}</p>
                    <p class="translation">${ayah.translation || 'Terjemahan tidak tersedia'}</p>
                </div>
            `).join('');
        });
}

// Load Surah (114 Surah dalam urutan mushaf standar)
function loadSurah() {
    const content = document.getElementById('surah-content');
    content.innerHTML = '';
    fetch('https://api.alquran.cloud/v1/surah')
        .then(res => res.json())
        .then(data => {
            data.data.forEach(surah => {
                content.innerHTML += `<div class="surah-item" onclick="loadSurahDetail(${surah.number})">${surah.number}. ${surah.englishName} (${surah.name})</div>`;
            });
        });
}

function loadSurahDetail(number) {
    fetch(`https://api.alquran.cloud/v1/surah/${number}`)
        .then(res => res.json())
        .then(data => {
            const content = document.getElementById('surah-content');
            content.innerHTML = `<h3>${data.data.englishName} (${data.data.name})</h3>` + data.data.ayahs.map(ayah => `
                <div class="surah-item">
                    <p class="arab-text">${ayah.text}</p>
                    <p class="translation">${ayah.translation || 'Terjemahan tidak tersedia'}</p>
                </div>
            `).join('');
        });
}