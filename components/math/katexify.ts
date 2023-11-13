import { Platform } from "react-native"

export interface KatexifyOptions {
  center?: boolean
  fontSize?: string
}

export function katexify(content: string, options: KatexifyOptions = {}) {
  return `<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8" crossorigin="anonymous"></script>  
    <style>
      html * {
        user-select: none;
      }
      html {
        font-size: ${Platform.select({ native: "3.5em", default: "1.2em" })};
      }

      html, body {
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
        height: 100%;
        background-color: #0000;
      }

      body {
        font-family: KaTeX_Main, "Times New Roman", serif;
        font-size: ${options.fontSize || "1em"};
        ${
          options.center
            ? "display: flex; justify-content: center; align-items: center;"
            : ""
        }
      }

      .katex {
        font-size: 1em;
      }
    </style>

    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"></script>
    <script>
      document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.getElementById("katex-contents"), {
          // customised options
          // • auto-render specific keys, e.g.:
          delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\(', right: '\\)', display: false},
            {left: '\\[', right: '\\]', display: true}
          ],
          // • rendering keys, e.g.:
          throwOnError: false
        });
      });
    </script>

  </head>
  <body>
      <div id="katex-contents">${content}</div>
  </body>
</html>
`
}
