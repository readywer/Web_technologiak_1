const defaultGame = {
    ID: "CUSA03682",
    Név: "Gran Turismo®SPORT",
    Digitális: false,
    TesztDátuma: "2023.12.27",
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

    const gameId = gameIdInput.val();
    const gameName = gameNameInput.val();
    const isDigital = digitalCheckbox.prop("checked");
    const testDate = testDateInput.val();
    const gameStatus = gameStatusInput.val();
    const backgroundColor = backgroundColorInput.val() || "#ffffff";

    // Ellenőrzés, hogy az adott ID-jű játék már létezik-e
    const existingGameIndex = games.findIndex(game => game.ID === gameId);

    if (existingGameIndex !== -1) {
        // Már létezik, frissítjük az adatokat
        games[existingGameIndex] = {
            ID: gameId,
            Név: gameName,
            Digitális: isDigital,
            TesztDátuma: testDate,
            Státusz: gameStatus,
            Háttérszín: backgroundColor
        };

        // Frissítjük a localStorage-ot
        localStorage.setItem("games", JSON.stringify(games));

        updateGamesList();

        // Töröljük az input mezők tartalmát
        clearInputFields();

        return;
    }

    // Az ID mező ellenőrzése
    if (!gameId || !isValidIdFormat(gameId)) {
        errorMessages.push("Az ID mező kitöltése kötelező és a formátum nem megfelelő (pl., CUSA12345).");
        gameIdInput.css("border-color", "red");
    } else {
        gameIdInput.css("border-color", "");
    }

    // A Név mező ellenőrzése
    if (!gameName) {
        errorMessages.push("A Név mező kitöltése kötelező.");
        gameNameInput.css("border-color", "red");
    } else {
        gameNameInput.css("border-color", "");
    }

    // A Teszt Dátuma mező ellenőrzése
    if (!testDate) {
        errorMessages.push("A Teszt Dátuma mező kitöltése kötelező.");
        testDateInput.css("border-color", "red");
    } else {
        testDateInput.css("border-color", "");
    }

    // További ellenőrzések...

    if (errorMessages.length > 0) {
        displayErrorMessages(errorMessages);
        return;
    }

    // Új játék hozzáadása a listához
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

    // Töröljük az input mezők tartalmát
    clearInputFields();
}

function clearInputFields() {
    $("#gameId").val("");
    $("#gameName").val("");
    $("#digitalCheckbox").prop("checked", false);
    $("#testDate").val("");
    $("#gameStatus").val("Playable");
    $("#backgroundColor").val("#ffffff");

    // Törlés után az összes mezőről eltávolítjuk a piros keretet
    $("input, select").css("border-color", "");
}

$(document).ready(() => {
    const backgroundColorInput = $("#backgroundColor");
    backgroundColorInput.val("#ffffff");
    updateGamesList();
});
