
const generateButton = document.getElementById('generateBtn');
const ledNumberInput = document.getElementById('ledNumberInpt');
const fanSizeInput = document.getElementById('fanSizeInpt');

const outputArea = document.getElementById('output');

generateButton.onclick = function () {
    const ledNumber = ledNumberInput.value;
    const fanSize = fanSizeInput.value;
    const layout = createLayout(fanSize, fanSize, ledNumber);
    console.log(layout);

    outputArea.value = layout.documentElement.outerHTML;
}

const copyButton = document.getElementById('copyBtn');
copyButton.onclick = function () {
    outputArea.select();
    navigator.clipboard.writeText(outputArea.value);
}

const downloadButton = document.getElementById('downloadBtn');
downloadButton.onclick = function () {
    const textToWrite = outputArea.value;
    //  create a new Blob (html5 magic) that conatins the data from your form feild
    const textFileAsBlob = new Blob([textToWrite], { type: 'text/xml' });
    // Specify the name of the file to be saved
    const fileNameToSaveAs = `${fanSizeInput.value}S${ledNumberInput.value}.xml`;

    // create a link for our script to 'click'
    const downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "My Hidden Link";

    window.URL = window.URL || window.webkitURL;

    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    // click the new link
    downloadLink.click();
}

function destroyClickedElement(event) {
    // remove the link from the DOM
    document.body.removeChild(event.target);
}
