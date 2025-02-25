document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("document-form");
    const documentList = document.getElementById("document-list");

    function loadDocuments() {
        const savedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
        savedDocuments.forEach(doc => addRow(doc));
    }

    function addRow(doc) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${doc.awb}</td>
            <td>${doc.dataRecebimento}</td>
            <td>${doc.horaRecebimento}</td>
            <td>${doc.peso} KG</td>
            <td>${doc.origem}</td>
            <td>${doc.destino}</td>
            <td class="status">${doc.status}</td>
            <td><button class="embarcado-btn">Embarcado</button></td>
            <td><button class="remover-btn">Remover</button></td>
        `;
        
        const embarcadoBtn = row.querySelector(".embarcado-btn");
        embarcadoBtn.addEventListener("click", function () {
            doc.status = "Embarcado";
            row.querySelector(".status").textContent = "Embarcado";
            updateLocalStorage();
        });
        
        const removerBtn = row.querySelector(".remover-btn");
        removerBtn.addEventListener("click", function () {
            row.remove();
            updateLocalStorage();
        });
        
        documentList.appendChild(row);
    }

    function updateLocalStorage() {
        const updatedDocuments = [];
        documentList.querySelectorAll("tr").forEach(row => {
            const cells = row.querySelectorAll("td");
            if (cells.length > 0) {
                updatedDocuments.push({
                    awb: cells[0].textContent,
                    dataRecebimento: cells[1].textContent,
                    horaRecebimento: cells[2].textContent,
                    peso: cells[3].textContent.replace(" KG", ""),
                    origem: cells[4].textContent,
                    destino: cells[5].textContent,
                    status: cells[6].textContent
                });
            }
        });
        localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const awb = document.getElementById("document-name").value;
        const dataRecebimento = document.getElementById("data-recebimento").value;
        const horaRecebimento = document.getElementById("hora-recebimento").value;
        const peso = document.getElementById("peso-documento").value;
        const origem = document.getElementById("origem-documento").value;
        const destino = document.getElementById("destino-documento").value;
        const status = document.getElementById("status").value;

        // Check for empty fields before adding
        if (!awb || !dataRecebimento || !horaRecebimento || !peso || !origem || !destino || !status) {
            alert("Preencha todos os campos!");
            return;
        }

        const documentData = { awb, dataRecebimento, horaRecebimento, peso, origem, destino, status };
        addRow(documentData);

        let savedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
        savedDocuments.push(documentData);
        localStorage.setItem("documents", JSON.stringify(savedDocuments));

        form.reset();
    });

    loadDocuments();
});
