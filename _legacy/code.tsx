import stripIndent from "strip-indent";

function formatMultilineCode(input: string): string {
  let inputLines = stripIndent(input).split("\n");

  const start = (() => {
    for (let i = 0; i < inputLines.length; i++) {
      if (inputLines[i].trim() !== "") return i;
    }
    return 0;
  })();

  const end = (() => {
    for (let i = inputLines.length - 1; i >= 0; i--) {
      if (inputLines[i].trim() !== "") return i;
    }
    return inputLines.length - 1;
  })();

  inputLines = inputLines.slice(start, end + 1);

  return inputLines.join("\n");
}
