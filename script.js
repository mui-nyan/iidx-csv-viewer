(function () {

    let inputFile = document.getElementById('file');
    let reader = new FileReader();

    function fileChange(ev) {
        let target = ev.target;
        let file = target.files[0];
        let type = file.type;
        let size = file.size;

        reader.readAsText(file);
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
            rows.filter(r => r[1] !== undefined)
            .map(r => `<tr>
                    <td>${r[1]}</td>
                    <td data-cleartype="${r[10]}">${r[10]}</td>
                    <td data-cleartype="${r[17]}">${r[17]}</td>
                    <td data-cleartype="${r[24]}">${r[24]}</td>
                    <td data-cleartype="${r[31]}">${r[31]}</td>
                    <td data-cleartype="${r[38]}">${r[38]}</td>
                </tr>`)
            .join("\n")
        );
        document.getElementById("tableBody").innerHTML = rows_html;
    }

    inputFile.addEventListener('change', fileChange, false);
    reader.addEventListener('load', fileLoad, false);
})();
