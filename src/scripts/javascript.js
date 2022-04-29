// API BEING USED: https://remoteok.com/api?tag=css
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(xhttp.responseText));
        var data = JSON.parse(xhttp.responseText);
        var jobsContainer = document.querySelector('#jobsContainer');
        // var jobsContainer = $('#jobsContainer');
        data.slice(1).forEach(function(row, i) {
            console.log(row, i);
            var rowDiv = document.createElement('div');
            // var rowDiv = $('div');
            rowDiv.classList.add('row', 'mt-4', 'p-3', 'shadow-lg', 'rounded');
            rowDiv.innerHTML = `
                <div class="outer-left-section">
                    <div class="logo-wrapper">
                        <img class="shadow rounded-circle" src="${row.company_logo}" alt="Logo for ${row.company}">
                    </div>
                </div>
                <div class="inner-left-section">
                    <h5 class="company m-1">${row.company}</h5>
                    <h3 class="position m-1">${row.position}</h3>
                    <p class="location d-inline-block rounded m-1">${row.location}</p>
                </div>
                <div class="inner-right-section">
                    ${row.tags.map(function(tag) {
                        return `<div class="tag rounded m-1">${tag}</div>`
                    }).join('')}
                </div>
                <div class="outer-right-section">
                    <div class="button-wrapper">
                        <a href="${row.url}" target="_blank"><button class="apply-btn shadow">Apply</button></a>
                    </div>
                </div>
            `;
            jobsContainer.appendChild(rowDiv);
            // jobsContainer.append(rowDiv);
        });
    }
};
xhttp.open("GET", "https://remoteok.com/api?tag=css", true);
xhttp.send();
