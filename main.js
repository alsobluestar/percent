function calculateProgress(now) {
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const yearProgress = ((now - startOfYear) / (new Date(now.getFullYear() + 1, 0, 1) - startOfYear)) * 100;
    const monthProgress = ((now - startOfMonth) / (new Date(now.getFullYear(), now.getMonth() + 1, 1) - startOfMonth)) * 100;
    const weekProgress = ((now - startOfWeek) / (new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7) - startOfWeek)) * 100;
    const dayProgress = ((now - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / (24 * 60 * 60 * 1000)) * 100;

    return {
        yearProgress,
        monthProgress,
        weekProgress,
        dayProgress,
    };
}

function update() {

    const now = new Date();



    const options = { hour12: true };
    const formattedTime = now.toLocaleString(undefined, options);


    console.log(now)
    const progress = calculateProgress(now);
    const progressTypes = ['Day', 'Week', 'Month', 'Year'];
    let format = '<div id="clock"></div>';

    for (const type of progressTypes) {
        format += `
      <div class="card">
        <div class="text">${type} progress</div>
        <div class="percent">${progress[type.toLowerCase() + 'Progress'].toFixed(2)}%</div>
      </div>
    `;
    }

    document.getElementById("progress").innerHTML = format;
    document.getElementById("clock").innerHTML = formattedTime;

}

setInterval(update, 1000);