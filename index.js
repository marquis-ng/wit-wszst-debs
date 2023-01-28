window.onload = function() {
    Array.from(document.getElementsByClassName("pkgname")).forEach(pkg => {
        fetch(document.baseURI + "/" + pkg.innerText + "-version.txt")
            .then(response => {
                if (response.ok) {
                    return response.text().then(version => "Version: " + version);
                }
                return "Error: " + response.status;
            })
            .then(msg => pkg.setAttribute("title", msg))
            .catch(error => pkg.setAttribute("title", "Error"));
    });

    const COPY_LABEL = "Copy";
    const COPIED_LABEL = "Copied!";
    function copyToClipboard(block, button) {
        button.innerText = COPIED_LABEL;
        navigator.clipboard.writeText(block.querySelector("code").innerText);
        setTimeout(function() {
            button.innerText = COPY_LABEL;
        }, 2000);
    };
    document.querySelectorAll('pre').forEach(block => {
        if (navigator.clipboard) {
            let button = document.createElement("button");
            button.innerText = COPY_LABEL;
            block.setAttribute("tabindex", "0");
            block.appendChild(button);
            button.addEventListener("click", function() {
                copyToClipboard(block, button);
            });
        }
    });
    hljs.highlightAll();
};
