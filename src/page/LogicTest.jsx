import React from "react";

function LogicTest() {
  let codeStr = `
    const reverseStringSpecialCharacters = (str) => {
        let chars = str.split('');
        let left = 0;
        let right = chars.length - 1;

        function isLetter(char) {
            return /[a-zA-Z]/.test(char);
        }

        for (left = 0, right = chars.length - 1; left < right;) {
            if (!isLetter(chars[left])) {
                left++;
            } else if (!isLetter(chars[right])) {
                right--;
            } else {
                let temp = chars[left];
                chars[left] = chars[right];
                chars[right] = temp;
                left++;
                right--;
            }
        }

        return chars.join('');
    };

    const str1 = "a,b$c";
    const str2 = "h#llo wo#rld!";

    console.log(str1);
    console.log(str2);

    console.log(reverseStringSpecialCharacters(str1));
    console.log(reverseStringSpecialCharacters(str2));
    `;

  const str1 = "a,b$c";
  const str2 = "h#llo wo#rld!";
  const str3 = "#$joe$#"
  const reverseStringSpecialCharacters = (str) => {
    let chars = str.split("");
    let left = 0;
    let right = chars.length - 1;

    function isLetter(char) {
      return /[a-zA-Z]/.test(char);
    }

    for (left = 0, right = chars.length - 1; left < right; ) {
      if (!isLetter(chars[left])) {
        left++;
      } else if (!isLetter(chars[right])) {
        right--;
      } else {
        let temp = chars[left];
        chars[left] = chars[right];
        chars[right] = temp;
        left++;
        right--;
      }
    }

    return chars.join("");
  };

  console.log(str1);
  console.log(str2);
  console.log(reverseStringSpecialCharacters(str1));
  console.log(reverseStringSpecialCharacters(str2));
  console.log(reverseStringSpecialCharacters(str3));
  return (
    <div className="logic-test-container">
      <h2>Logic Test</h2>
      <p className="logic-test-container__description">
        Dada una cadena que contiene un carácter especial junto con letras (de
        la 'a' a la 'z' y de la 'A' a la 'Z'), invierta la cadena de manera que
        los caracteres especiales no se vean afectados.
      </p>

      <pre>
        <code>{codeStr}</code>
      </pre>
    </div>
  );
}

export default LogicTest;
