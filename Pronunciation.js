// pronunciation.js

// Datasets
const IonianAlphabetData = [
  { letter: "A", ipa: "[a]", notes: "Also [a:] (long)" },
  { letter: "B", ipa: "[b]", notes: "" },
  { letter: "C", ipa: "[t͡ʃ] / [k]", notes: "[t͡ʃ] before i or e, otherwise [k]" },
  { letter: "D", ipa: "[d]", notes: "" },
  { letter: "E", ipa: "[e] / [ɛ]", notes: "[e] closed, [ɛ] open (stressed or with grave marker È)" },
  { letter: "É", ipa: "[e]", notes: "Always closed, appears unstressed or explicitly marked" },
  { letter: "F", ipa: "[f]", notes: "" },
  { letter: "G", ipa: "[d͡ʒ] / [g]", notes: "[d͡ʒ] before i or e, otherwise [g]" },
  { letter: "H", ipa: "(silent)", notes: "Maintains hard sound alignments in historical combinations" },
  { letter: "I", ipa: "[i]", notes: "" },
  { letter: "J", ipa: "[j]", notes: "" },
  { letter: "L", ipa: "[l]", notes: "" },
  { letter: "M", ipa: "[m]", notes: "" },
  { letter: "N", ipa: "[n]", notes: "" },
  { letter: "O", ipa: "[o] / [ɔ]", notes: "[o] closed, [ɔ] open (stressed or with grave marker Ò)" },
  { letter: "P", ipa: "[p]", notes: "" },
  { letter: "Q", ipa: "[k] / [kw]", notes: "[k] before i or e; [kw] in Qu + Vowel combinations" },
  { letter: "R", ipa: "[r] / [ɾ]", notes: "[r] rolled; [ɾ] tapped between vowels, after a consonant, or following a word ending in a vowel" },
  { letter: "S", ipa: "[s] / [z]", notes: "Regularly unvoiced [s]. Shifts to voiced [z] between vowels and before voiced consonants unless preceding a stressed vowel" },
  { letter: "T", ipa: "[t]", notes: "" },
  { letter: "U", ipa: "[u] / [w]", notes: "[u] vowel; semi-vowel [w] when appearing immediately before a, e, i, or o" },
  { letter: "V", ipa: "[v]", notes: "" },
  { letter: "X", ipa: "[ks]", notes: "" },
  { letter: "Z", ipa: "[z]", notes: "" }
];

const IonianDigraphData = [
  { combination: "ci + a/o/u", ipa: "[t͡ʃa], [t͡ʃo], [t͡ʃu]", notes: "Vowel insertion preserves the palatal affricate sound" },
  { combination: "gi + a/o/u", ipa: "[d͡ʒa], [d͡ʒo], [d͡ʒu]", notes: "Preserves the voiced palatal affricate sound" },
  { combination: "sci + a/o/u", ipa: "[ʃa], [ʃo], [ʃu]", notes: "Produces the postalveolar fricative sound" },
  { combination: "sc", ipa: "[ʃ] / [k]", notes: "[ʃ] when positioned before i or e, otherwise [k]" },
  { combination: "Qi / Qe", ipa: "[ki] / [ke]", notes: "Hard palatal spelling rule replacing hard C sounds before front vowels" },
  { combination: "Ghi / Ghe", ipa: "[gi] / [ge]", notes: "Maintains hard velar stops before front vowels" },
  { combination: "Sqi / Sqe", ipa: "[ski] / [ske]", notes: "Preserves the unvoiced velar cluster" },
  { combination: "ch", ipa: "[x]", notes: "Voiceless velar fricative digraph" },
  { combination: "th", ipa: "[θ]", notes: "Voiceless dental fricative digraph" },
  { combination: "zz / z'", ipa: "[t͡s̺]", notes: "Medial double z or word-final z' map to the alveolar affricate" },
  { combination: "nc / nq", ipa: "[ŋk]", notes: "Velar nasal distribution: nc before back vowels, nq before front vowels" },
  { combination: "ng / ngh", ipa: "[ŋg]", notes: "Voiced velar nasal distribution: ng before back vowels, ngh before front vowels" },
  { combination: "gn", ipa: "[ɲ]", notes: "Palatal nasal consonant" },
  { combination: "gl + i-vowel", ipa: "[ʎa], [ʎe], [ʎi], [ʎo], [ʎu]", notes: "Palatal lateral approximant series" },
  { combination: "ll", ipa: "[l.l]", notes: "Phonetically geminated dental lateral stop" },
  { combination: "tî / tê", ipa: "[t͡ʃi] / [t͡ʃe]", notes: "Standard and central affrication marker; tê limited exclusively to word-final positions" }
];

// DOM Targeting Elements
const alphabetView = document.getElementById('alphabet-view');
const digraphsView = document.getElementById('digraphs-view');
const btnAlphabet = document.getElementById('tab-alphabet');
const btnDigraphs = document.getElementById('tab-digraphs');

// Initialization Hook
document.addEventListener('DOMContentLoaded', () => {
    renderAlphabet();
    renderDigraphs();
    setupTabSwitching();
});

// Build individual letter blocks inside the alphabet container
function renderAlphabet() {
    alphabetView.innerHTML = IonianAlphabetData.map(item => `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div class="flex items-center gap-4">
                <span class="text-3xl font-extrabold text-[#1a5695] w-8">${item.letter}</span>
                <span class="ipa-badge text-sm px-3 py-1 rounded-md font-medium">${item.ipa}</span>
            </div>
            <p class="text-sm text-gray-500 text-right max-w-[60%] font-normal">${item.notes || 'Standard uniform value'}</p>
        </div>
    `).join('');
}

// Build combination digraph blocks inside the digraphs container
function renderDigraphs() {
    digraphsView.innerHTML = IonianDigraphData.map(item => `
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-2 justify-center">
            <div class="flex items-center justify-between">
                <span class="text-xl font-bold text-gray-800">${item.combination}</span>
                <span class="ipa-badge text-sm px-3 py-1 rounded-md font-medium">${item.ipa}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">${item.notes}</p>
        </div>
    `).join('');
}

// Coordinate visibility logic and styling updates across interface tabs
function setupTabSwitching() {
    btnAlphabet.addEventListener('click', () => {
        alphabetView.classList.remove('hidden');
        digraphsView.classList.add('hidden');
        
        btnAlphabet.classList.add('tab-active');
        btnAlphabet.classList.remove('text-gray-500');
        btnDigraphs.classList.remove('tab-active');
        btnDigraphs.classList.add('text-gray-500');
    });

    btnDigraphs.addEventListener('click', () => {
        digraphsView.classList.remove('hidden');
        alphabetView.classList.add('hidden');
        
        btnDigraphs.classList.add('tab-active');
        btnDigraphs.classList.remove('text-gray-500');
        btnAlphabet.classList.remove('tab-active');
        btnAlphabet.classList.add('text-gray-500');
    });
}
