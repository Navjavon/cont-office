const frameId = 'printFrame';

function closePrint() {
    const frame = document.getElementById(frameId);
    document.body.removeChild(frame);
}

function setPrint() {
    this.contentWindow.onbeforeunload = closePrint;
    this.contentWindow.onafterprint = closePrint;
    this.contentWindow.print();
}

export function printHtmlElementById(id: string, title: string = '') {
    const element = document.getElementById(id);
    if (!element) {
        console.error(`Could not find html element by id = ${id}`);
        return;
    }

    const html = element.innerHTML;

    let iframe = document.createElement('iframe');
    iframe.onload = setPrint;
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.id = frameId;

    iframe.srcdoc = `
      <html lang="ru">
        <head>
          <title>${title}</title>
          <link rel="stylesheet" type="text/css" href="/main.css">
        </head>
        <body class="v-application">
          <v-row>
            ${html}
          </v-row>
        </body>
      </html>
    `;

    document.body.appendChild(iframe);
}
