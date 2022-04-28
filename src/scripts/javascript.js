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
            
            // var styles = {
            //     "display": "flex",
            //     "flex-direction": "row",
            // };
            // Object.assign(rowDiv.style, styles);

            rowDiv.classList.add('row', 'mt-4', 'p-3', 'shadow-lg', 'rounded');
            rowDiv.innerHTML = `
                <div class="outer-left-section">
                    <div class="logo-wrapper">
                        <img class="shadow rounded-circle" src="${row.company_logo}" alt="Logo for ${row.company}">
                    </div>
                </div>
                <div class="inner-left-section">
                    <h5 class="company">${row.company}</h5>
                    <h3 class="position">${row.position}</h3>
                    <p class="location">${row.location}</p>
                </div>
                <div class="inner-right-section"></div>
                <div class="outer-right-section"></div>
            `;
            jobsContainer.appendChild(rowDiv);
            // jobsContainer.append(rowDiv);
        });
    }
};
xhttp.open("GET", "https://remoteok.com/api?tag=css", true);
xhttp.send();
