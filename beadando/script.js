const defaultGame = {
    ID: "CUSA03682",
    Név: "Gran Turismo®SPORT",
    Digitális: false,
    TesztDátuma: "",
    Státusz: "Ingame",
    Háttérszín: "#ffffff"
};

const games = JSON.parse(localStorage.getItem("games")) || [defaultGame];

function updateGamesList() {
    const gamesList = $("#gamesList");
    gamesList.empty();

    games.forEach(game => {
        const row = `
            <tr style="background-color: ${game.Háttérszín};">
                <td>${game.ID}</td>
                <td>${game.Név}</td>
                <td>${game.Digitális ? "Igen" : "Nem"}</td>
                <td>${game.TesztDátuma || "N/A"}</td>
                <td>${game.Státusz}</td>
            </tr>`;
        gamesList.append(row);
    });
}

function isValidIdFormat(id) {
    const idPattern = /^CUSA\d{5}$/;
    return idPattern.test(id);
}

function isDuplicateId(id) {
    return games.some(game => game.ID === id);
}

function addGame() {
    const gameId = $("#gameId").val();
    const gameName = $("#gameName").val();
    const isDigital = $("#digitalCheckbox").prop("checked");
    const testDate = $("#testDate").val();
    const gameStatus = $("#gameStatus").val();
    const backgroundColor = $("#backgroundColor").val();

    if (gameId && gameName && isValidIdFormat(gameId) && !isDuplicateId(gameId)) {
        const newGame = {
            ID: gameId,
            Név: gameName,
            Digitális: isDigital,
            TesztDátuma: testDate,
            Státusz: gameStatus,
            Háttérszín: backgroundColor
        };

        games.push(newGame);

        // Frissítjük a localStorage-ot
        localStorage.setItem("games", JSON.stringify(games));

        updateGamesList();

        $("#gameId").val("");
        $("#gameName").val("");
        $("#digitalCheckbox").prop("checked", false);
        $("#testDate").val("");
        $("#gameStatus").val("Playable");
        $("#backgroundColor").val("#ffffff");
    } else {
        if (isDuplicateId(gameId)) {
            alert("Ez az ID már létezik. Kérlek, adj meg egy másikat!");
        } else {
            alert("Kérlek, ellenőrizd az ID formátumát és töltsd ki az összes mezőt!");
        }
    }
}

$(document).ready(() => {
    updateGamesList();
});
