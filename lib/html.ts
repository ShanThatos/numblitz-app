import { MathProblem } from "~/api/types";

/* eslint-disable */
export const buildModelExplanationHtmlPage = (explanation: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- KaTeX -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" integrity="sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous"></script>

  <!-- QuillJS -->
  <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet">

  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      background-color: #0000;
      font-size: .95em;
    }

    #root {
      border: none;
    }
    .ql-container .katex {
      font-size: 1em;
    }
    .ql-container {
      font-size: 1.1em;
      font-family: KaTeX_Main, "Times New Roman", serif;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  <script>
    var explanation = ${explanation};

    const Embed = Quill.import('blots/embed');
    class SoftLineBreakBlot extends Embed {
        static blotName = 'softbreak';
        static tagName = 'br';  
        static className = 'softbreak';
    }
    Quill.register(SoftLineBreakBlot);

    const quillPreview = new Quill("#root", {
      modules: {
        toolbar: false
      },
      readOnly: true,
      theme: "snow"
    });
    quillPreview.setContents(explanation);
  </script>
</body>
</html>
  `;
};

export const buildKatexHtmlPage = (
  source: string,
  options: any = undefined,
) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- KaTeX -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" integrity="sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.js" integrity="sha384-7zkQWkzuo3B5mTepMUcHkMB5jZaolc2xDwL6VFqjFALcbeS9Ggm/Yr2r3Dy4lfFg" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/auto-render.min.js" integrity="sha384-43gviWU0YVjaDtb/GhzOouOXtZMP/7XUzwPTstBeZFe/+rCMvRwr4yROQP43s0Xk" crossorigin="anonymous"></script>

  <style>
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: fit-content;
      background-color: #0000;
    }
    body {
      font-size: ${options?.fontSize ?? "1em"};
    }
    .katex {
      font-size: 1em;
    }
    .container {
      font-family: KaTeX_Main, "Times New Roman", serif;
      ${options?.textAlign ? `text-align: ${options.textAlign};` : ""}
      width: ${options?.width ?? "fit-content"};
      ${
        options?.align === "left"
          ? "margin-left: 0; margin-right: auto;"
          : options?.align === "right"
            ? "margin-left: auto; margin-right: 0;"
            : options?.align === "center"
              ? "margin-left: auto; margin-right: auto;"
              : "margin-left: 0; margin-right: 0;"
      }
      ${options?.color ? `color: ${options.color};` : ""}
    }
  </style>
</head>
<body>
  <div class="container">
    ${source}
  </div>
  <script>
    var katexRenderOptions = {
        delimiters: [
            {left: '$$', right: '$$', display: true},
            {left: '$', right: '$', display: false},
            {left: '\\\\(', right: '\\\\)', display: false},
            {left: '\\\\[', right: '\\\\]', display: true}
        ]
    }

    document.addEventListener("DOMContentLoaded", function() {
        renderMathInElement(document.body, katexRenderOptions);
    });
  </script>
</body>
</html>
  `;
};

export const buildQuestionsAnswersHtmlPage = (
  problems: MathProblem[],
  answers: string[],
) => {
  const content = `
    <style>
      .problem-container {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 10px 5px;
        padding: 15px;
        padding-top: 8px;
      }
      .problem-label {
        display: grid;
        place-items: center;
        border-radius: .25rem;
        border: 2px solid;
        height: 35px;
        aspect-ratio: 1;
        box-sizing: border-box;
        font-size: 1.25em;
      }
      .problem-skipped {
        background-color: #FFF7F0;
        border-color: #FFBB00;
      }
      .problem-correct {
        background-color: #F0FFF0;
        border-color: #008000;
      }
      .problem-incorrect {
        background-color: #FFF5F5;
        border-color: #DC143C;
      }
      .problem-question {
        min-height: 35px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 3px;
        padding-top: 7px;
      }
      .problem-answer {
        min-height: 35px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-end;
        gap: 3px;
        padding-top: 7px;
      }
    </style>
    <div class="problem-container">
      ${problems
        .map(
          (problem, index) => `
            <div class="problem-label problem-${
              index >= answers.length
                ? "skipped"
                : answers[index] === problem.answer
                  ? "correct"
                  : "incorrect"
            }">${index + 1}</div>
            <div class="problem-question">
              <div>
                ${problem.question}
              </div>
              ${
                problem.choices
                  ? `
                  <div>
                    ${problem.choices
                      .map(
                        (choice, index) =>
                          `<div><b style="display: inline-block; width: 20px;">${"ABCDEFG".at(index)}</b>&nbsp; ${choice}</div>`,
                      )
                      .join("\n")}
                  </div>
                `
                  : ""
              }
            </div>
            <div class="problem-answer">
              <div>${problem.answer} ${problem.units}</div>
              ${
                index < answers.length && answers[index] !== problem.answer
                  ? `<div style="color: red;">${
                      ["", "$$", "$\\frac{}{}$"].includes(answers[index])
                        ? "No answer"
                        : `${answers[index]} ${problem.units}`
                    }</div>`
                  : ""
              }
            </div>
          `,
        )
        .join("\n")}
    </div>
  `;
  return buildKatexHtmlPage(content, {
    width: "100%",
  });
};
