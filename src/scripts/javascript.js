// API BEING USED: https://remoteok.com/api?tag=css
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(xhttp.responseText);
        var jobsContainer = document.querySelector('#jobsContainer');
        // var jobsContainer = $('#jobsContainer');
        data.slice(1).forEach(function(row, i) {
            var rowDiv = document.createElement('div');
            // var rowDiv = $('div');
            rowDiv.classList.add('row', 'mt-4', 'p-3', 'shadow-lg', 'rounded');
            // converts JSON date string into a JavaScript usable date code gathered from: https://weblog.west-wind.com/posts/2014/jan/06/javascript-json-date-parsing-and-real-dates
            if (window.JSON && !window.JSON.dateParser) {
                var reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;
                var reMsAjax = /^\/Date\((d|-|.*)\)[\/|\\]$/;
                JSON.dateParser = function (key, value) {
                    if (typeof value === 'string') {
                        var a = reISO.exec(value);
                        if (a)
                            return new Date(value);
                        a = reMsAjax.exec(value);
                        if (a) {
                            var b = a[1].split(/[-+,.]/);
                            return new Date(b[0] ? +b[0] : 0 - +b[1]);
                        }
                    }
                    return value;
                };
            }
            rowDivDateCount = function() {
                var jsonStringDate = JSON.stringify(row.date);
                var jsonDate = JSON.parse(jsonStringDate, JSON.dateParser);
                var datePosted = new Date(jsonDate).getTime();
                var currentDate = new Date().getTime();
                var difference = currentDate - datePosted;
                var daysElapsed = (difference / 3600000 / 24);
                return daysElapsed;
            }

            timeMeasureDisplay = function(timeAmount) {
                let returnString = ''
                if (timeAmount < 1) {
                    returnString = 'h';
                } else {
                    returnString = 'd'
                }
                return returnString;
            }
            
            rowDiv.innerHTML = `
                <div class="row-sections-wrapper">
                    <section class="left-top-segment">
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
                    </section>
                    <section class = "right-bottom-segment">
                        <div class="inner-right-section">
                            ${row.tags.map(function(tag) {
                                return `<div class="tag rounded m-1">${tag}</div>`
                            }).join('')}
                        </div>
                        <div class="middle-right-section">
                            <i class="icon-pushpin"></i> ${Math.floor(rowDivDateCount())}${timeMeasureDisplay(rowDivDateCount())}
                        </div>
                        <div class="outer-right-section">
                            <div class="button-wrapper">
                                <a href="${row.url}" target="_blank"><button class="apply-btn shadow">Apply</button></a>
                            </div>
                        </div>
                    </section>
                </div>
            `;
            jobsContainer.appendChild(rowDiv);
            // jobsContainer.append(rowDiv);
        });
    }
};
xhttp.open("GET", "https://remoteok.com/api?tag=css", true);
xhttp.send();
