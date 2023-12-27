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

function displayErrorMessages(errorMessages) {
    alert(errorMessages.join("\n"));

    // Hibaüzenetekhez tartozó stílusok beállítása
    errorMessages.forEach(errorMessage => {
        if (errorMessage.includes("Az ID mező")) {
            $("#gameId").css("border-color", "red");
        } else if (errorMessage.includes("A Név mező")) {
            $("#gameName").css("border-color", "red");
        } else if (errorMessage.includes("A Teszt Dátuma mező")) {
            $("#testDate").css("border-color", "red");
        }
        // További stílusbeállítások a többi elemhez...
    });
}

function addGame() {
    const gameIdInput = $("#gameId");
    const gameNameInput = $("#gameName");
    const digitalCheckbox = $("#digitalCheckbox");
    const testDateInput = $("#testDate");
    const gameStatusInput = $("#gameStatus");
    const backgroundColorInput = $("#backgroundColor");

    const errorMessages = [];

    if (!gameIdInput.val() || !isValidIdFormat(gameIdInput.val())) {
        errorMessages.push("Az ID mező kitöltése kötelező és a formátum nem megfelelő (pl., CUSA12345).");
        gameIdInput.css("border-color", "red");
    } else {
        gameIdInput.css("border-color", "");
    }

    if (!gameNameInput.val()) {
        errorMessages.push("A Név mező kitöltése kötelező.");
        gameNameInput.css("border-color", "red");
    } else {
        gameNameInput.css("border-color", "");
    }

    if (!testDateInput.val()) {
        errorMessages.push("A Teszt Dátuma mező kitöltése kötelező.");
        testDateInput.css("border-color", "red");
    } else {
        testDateInput.css("border-color", "");
    }

    if (errorMessages.length > 0) {
        displayErrorMessages(errorMessages);
        return;
    }

    const gameId = gameIdInput.val();
    const gameName = gameNameInput.val();
    const isDigital = digitalCheckbox.prop("checked");
    const testDate = testDateInput.val();
    const gameStatus = gameStatusInput.val();
    const backgroundColor = backgroundColorInput.val();

    if (gameId && gameName && isValidIdFormat(gameId) && !isDuplicateId(gameId)) {
        const newGame = {
            ID: gameId,
            Név: gameName,
            Digitális: isDigital,
            TesztDátuma: testDate,
            Státusz: gameStatus,
            Háttérszín: backgroundColor || "#ffffff"
        };

        games.push(newGame);

        localStorage.setItem("games", JSON.stringify(games));

        updateGamesList();

        gameIdInput.val("");
        gameNameInput.val("");
        digitalCheckbox.prop("checked", false);
        testDateInput.val("");
        gameStatusInput.val("Playable");
        backgroundColorInput.val("#ffffff");
    } else {
        if (isDuplicateId(gameId)) {
            alert("Ez az ID már létezik. Kérlek, adj meg egy másikat!");
        } else {
            alert("Kérlek, ellenőrizd az ID formátumát, töltsd ki az összes mezőt, és válassz ki egy Teszt Dátumot!");
        }
    }
}

$(document).ready(() => {
    const backgroundColorInput = $("#backgroundColor");
    backgroundColorInput.val("#ffffff");
    updateGamesList();
});
