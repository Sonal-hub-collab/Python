function calculateFootprint() {

    let electricity = parseFloat(document.getElementById("electricity").value) || 0;
    let fuel = parseFloat(document.getElementById("fuel").value) || 0;
    let plastic = parseFloat(document.getElementById("plastic").value) || 0;

    // Carbon calculation formula (estimated values)
    let carbonElectricity = electricity * 0.92; 
    let carbonFuel = fuel * 2.3;
    let carbonPlastic = plastic * 0.5;

    let totalCarbon = carbonElectricity + carbonFuel + carbonPlastic;

    // Eco Score (lower carbon = better score)
    let ecoScore = Math.max(0, 200 - totalCarbon);

    let level = "";
    if (ecoScore <= 50) {
        level = "Beginner 🌱";
    } else if (ecoScore <= 100) {
        level = "Eco Friendly 🌿";
    } else {
        level = "Eco Hero 🌍";
    }

    let resultText = `
        <h3>Your Results</h3>
        <p>Total Carbon Emission: ${totalCarbon.toFixed(2)} kg CO₂</p>
        <p>Eco Score: ${ecoScore.toFixed(0)}</p>
        <p>Level: <strong>${level}</strong></p>
    `;

    document.getElementById("result").innerHTML = resultText;

    // Save to Local Storage
    localStorage.setItem("carbonData", JSON.stringify({
        electricity,
        fuel,
        plastic,
        totalCarbon,
        ecoScore,
        level
    }));
}