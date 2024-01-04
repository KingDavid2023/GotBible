window.onload = function() {
    fetchKJVVerses();
    fetchESVVerses();
    fetchRandomVerseKJV();
    fetchRandomVerseESV();
};
let versesKJV = [];
        let esvBverses = [];
        function fetchKJVVerses() {
            fetch('bible.csv')
                .then(response => response.text())
                .then(data => {
                    let verses = $.csv.toObjects(data, { headers: ['citation', 'verse'] });
                    versesKJV = verses.map(obj => ({ citation: obj.citation, text: obj.verse }));
                })
                .catch(error => {
                    console.error('Error fetching KJV verses:', error);
                });
        }
fetchKJVVerses()
        async function fetchESVVerses() {
            try {
                const response = await fetch('ESVBible.csv');
                const data = await response.text();

                const lines = data.split('\n').map(line => line.replace(/"/g, ''));

                esvBverses = lines.reduce((acc, verse, index) => {
                    if (verse.trim() !== '') {
                        acc.push({ citation: (index + 1).toString(), verse: verse.trim() });
                    }
                    return acc;
                }, []);

                console.log('ESV Verses:', esvBverses);
            } catch (error) {
                console.error('Error fetching ESV verses:', error);
            }
        }
        function fetchRandomVerseKJV() {
            if (versesKJV.length === 0) {
                fetchKJVVerses();
            } else {
                let randomIndex = Math.floor(Math.random() * versesKJV.length);
                let randomVerse = versesKJV[randomIndex];
                console.log("Random KJV Verse:", randomVerse);
                document.getElementById("verse").innerHTML = randomVerse.citation + " " + randomVerse.text;
                let verseElement = document.getElementById('verse'); 
            }
        }
        function fetchRandomVerseESV() {
    if (esvBverses.length === 0) {
        fetchESVVerses();
    } else {
        let randomIndex = Math.floor(Math.random() * esvBverses.length);
        let randomVerse = esvBverses[randomIndex];
        let citationIndex = randomVerse.citation;
        if (citationIndex >= 0 && citationIndex < versesKJV.length) {
            randomVerse.citation = versesKJV[citationIndex-1].citation;
        } else {
            console.log("here you go", citationIndex, versesKJV.length);
        }
        console.log("Random ESV Verse:", randomVerse);
        document.getElementById("verse").innerHTML = randomVerse.citation + " " + randomVerse.verse;
    }
}
        document.getElementById('mainButton').onclick = function() {
            fetchRandomVerseKJV();
        };
        document.getElementById('alternativeButton').onclick = function() {
            fetchRandomVerseESV();
        };
