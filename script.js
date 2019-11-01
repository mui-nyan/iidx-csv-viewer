(function () {

    const INDEX_VERSION=0;
    const INDEX_TITLE=1;
    const INDEX_BEGINNER_CLEARTYPE=10;
    const INDEX_NORMAL_CLEARTYPE=17;
    const INDEX_HYPER_CLEARTYPE=24;
    const INDEX_ANOTHER_CLEARTYPE=31;
    const INDEX_LEGGENDARIA_CLEARTYPE=38;
    const INDEX_BEGINNER_DIFFICULTY=5;
    const INDEX_NORMAL_DIFFICULTY=12;
    const INDEX_HYPER_DIFFICULTY=19;
    const INDEX_ANOTHER_DIFFICULTY=26;
    const INDEX_LEGGENDARIA_DIFFICULTY=33;

    let musics;

    let inputFile = document.getElementById('file');
    let reader = new FileReader();

    function fileChange(ev) {
        let target = ev.target;
        let file = target.files[0];
        let type = file.type;
        let size = file.size;

        reader.readAsText(file);
    }

    function cleansingClearType(row) {
        if (row[INDEX_BEGINNER_DIFFICULTY] == 0) {
            row[INDEX_BEGINNER_DIFFICULTY] = "";
            row[INDEX_BEGINNER_CLEARTYPE] = "";
        }
        if (row[INDEX_NORMAL_DIFFICULTY] == 0) {
            row[INDEX_NORMAL_DIFFICULTY] = "";
            row[INDEX_NORMAL_CLEARTYPE] = "";
        }
        if (row[INDEX_HYPER_DIFFICULTY] == 0) {
            row[INDEX_HYPER_DIFFICULTY] = "";
            row[INDEX_HYPER_CLEARTYPE] = "";
        }
        if (row[INDEX_ANOTHER_DIFFICULTY] == 0) {
            row[INDEX_ANOTHER_DIFFICULTY] = "";
            row[INDEX_ANOTHER_CLEARTYPE] = "";
        }
        if (row[INDEX_LEGGENDARIA_DIFFICULTY] == 0) {
            row[INDEX_LEGGENDARIA_DIFFICULTY] = "";
            row[INDEX_LEGGENDARIA_CLEARTYPE] = "";
        }
        return row;
    }

    function renderingMusicTable(musics){
        let rows_html = (
            musics.map(r => `<tr>
                    <td>${r[INDEX_TITLE]}</td>
                    <td data-mode="Beginner">${r[INDEX_BEGINNER_DIFFICULTY]}</td>
                    <td data-mode="Normal">${r[INDEX_NORMAL_DIFFICULTY]}</td>
                    <td data-mode="Hyper">${r[INDEX_HYPER_DIFFICULTY]}</td>
                    <td data-mode="Another">${r[INDEX_ANOTHER_DIFFICULTY]}</td>
                    <td data-mode="Leggendaria">${r[INDEX_LEGGENDARIA_DIFFICULTY]}</td>
                    <td data-cleartype="${r[INDEX_BEGINNER_CLEARTYPE]}">${r[INDEX_BEGINNER_CLEARTYPE]}</td>
                    <td data-cleartype="${r[INDEX_NORMAL_CLEARTYPE]}">${r[INDEX_NORMAL_CLEARTYPE]}</td>
                    <td data-cleartype="${r[INDEX_HYPER_CLEARTYPE]}">${r[INDEX_HYPER_CLEARTYPE]}</td>
                    <td data-cleartype="${r[INDEX_ANOTHER_CLEARTYPE]}">${r[INDEX_ANOTHER_CLEARTYPE]}</td>
                    <td data-cleartype="${r[INDEX_LEGGENDARIA_CLEARTYPE]}">${r[INDEX_LEGGENDARIA_CLEARTYPE]}</td>
                </tr>`)
            .join("\n")
        );
        document.getElementById("tableBody").innerHTML = rows_html;
    }

    function loadMusicsFromCsv(csv) {
        let table = csv.split(/[\r\n]+/).map(s => s.split(","))
        // console.log(table);
        let headers = table[0];
        let rows = table.slice(1);
        console.log(headers)
        console.log(rows);

        musics = (
            rows.filter(r => r[INDEX_TITLE] !== undefined)
            .map(cleansingClearType)
        );
        renderingMusicTable(musics)
    }

    inputFile.addEventListener('change', fileChange, false);
    reader.addEventListener('load', () => loadMusicsFromCsv(reader.result), false);

    let versions = [
        ["1st&sub", "1st&substream"],
        ["2nd", "2nd style"],
        ["3rd", "3rd style"],
        ["4th", "4th style"],
        ["5th", "5th style"],
        ["6th", "6th style"],
        ["7th", "7th style"],
        ["8th", "8th style"],
        ["9th", "9th style"],
        ["10th", "10th style"],
        ["RED", "IIDX RED"],
        ["HS", "HAPPY SKY"],
        ["DD", "DistorteD"],
        ["GOLD", "GOLD"],
        ["DJT", "DJ TROOPERS"],
        ["EMP", "EMPRESS"],
        ["SIR", "SIRIUS"],
        ["RA", "Resort Anthem"],
        ["Lin", "Lincle"],
        ["tri", "tricoro"],
        ["SPA", "SPADA"],
        ["PEN", "PENDUAL"],
        ["cop", "copula"],
        ["SIN", "SINOBUZ"],
        ["CB", "CANNON BALLERS"],
        ["Roo", "Rootage"],
        ["HV", "HEROIC VERSE"]
    ];
    versionHtml = versions.map(v => `
        <input type="checkbox" name="version_check" class="version_check" id="version_${v[0]}" value="${v[1]}">
        <label for="version_${v[0]}" class="version_label">${v[0]}</label>`
    ).join("\n");
    document.getElementById("versionFilters").innerHTML = versionHtml;

    function onFilterChange(){
        let selectedVersions = [...document.querySelectorAll(".version_check:checked")].map(e => e.value);
        console.log(selectedVersions);
        let filteredMusics = (
            selectedVersions.length > 0 ?
                musics.filter(m => selectedVersions.includes(m[INDEX_VERSION])) :
                musics );
        renderingMusicTable(filteredMusics);
    }
    document.querySelectorAll(".version_check").forEach(elm => elm.onchange = onFilterChange)
})();
