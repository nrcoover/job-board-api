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
            rowDiv.classList.add('row', 'mt-4', 'p-3', 'shadow-lg');
            rowDiv.innerHTML = `
                <h5 class="company">${row.company}</h5>
                <h3 class="position">${row.position}</h3>
                <p class="location">${row.location}</p>
            `;
            jobsContainer.appendChild(rowDiv);
            // jobsContainer.append(rowDiv);
        });
    }
};
xhttp.open("GET", "https://remoteok.com/api?tag=css", true);
xhttp.send();
