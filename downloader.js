// Only add button if we are on a review page
if (window.location.href.indexOf("grading/view") >= 0) {
    addDownloadButton();
}

var opt = {
    margin: 2,
};

function addDownloadButton() {
    const toolbar = document.querySelector('section[role="toolbar"]');
    var downloadButton = document.createElement("button");
    downloadButton.setAttribute('class', 'mdc-top-app-bar__action-item mdc-button mdc-button--white ml-2 ');
    downloadButton.appendChild(document.createTextNode("Download"))
    toolbar.appendChild(downloadButton);

    downloadButton.addEventListener('click', download)
}

function download() {
    var pdfIframe = document.getElementById('pdf-iframe');
    var generalAnswers = document.querySelectorAll('.quiz-panel')

    if (pdfIframe != null && !pdfIframe.parentElement.classList.contains('d-none')) {
        pdfIframe.contentDocument.getElementById('download').click();
    } else if (generalAnswers != null && generalAnswers.length >= 1) {
        for (let i = 0; i < generalAnswers.length; i++) {
            alert("Rendering pdf, this might take a while")
            html2pdf().set(opt).from(generalAnswers[i]).save("ANS-" + document.title + "-" + (i + 1) + ".pdf");
        }
    } else {
        alert("ANS Downloader was not able to find the requested content on this page")
    }
}

