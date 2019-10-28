(function () {

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
            row[INDEX_BEGINNER_CLEARTYPE] = "";
        }
        if (row[INDEX_NORMAL_DIFFICULTY] == 0) {
            row[INDEX_NORMAL_CLEARTYPE] = "";
        }
        if (row[INDEX_HYPER_DIFFICULTY] == 0) {
            row[INDEX_HYPER_CLEARTYPE] = "";
        }
        if (row[INDEX_ANOTHER_DIFFICULTY] == 0) {
            row[INDEX_ANOTHER_CLEARTYPE] = "";
        }
        if (row[INDEX_LEGGENDARIA_DIFFICULTY] == 0) {
            row[INDEX_LEGGENDARIA_CLEARTYPE] = "";
        }
        return row;
    }

    function fileLoad() {
        let text = reader.result;
        let table = text.split(/[\r\n]+/).map(s => s.split(","))
        // console.log(table);
        let headers = table[0];
        let rows = table.slice(1);
        console.log(headers)
        console.log(rows);

        let rows_html = (
            rows.filter(r => r[INDEX_TITLE] !== undefined)
            .map(cleansingClearType)
            .map(r => `<tr>
                    <td>${r[INDEX_TITLE]}</td>
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

    inputFile.addEventListener('change', fileChange, false);
    reader.addEventListener('load', fileLoad, false);
})();
