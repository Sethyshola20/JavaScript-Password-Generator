const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");
const includeUppercaseElement = document.getElementById("includeUppercase");
const includeNumbersElement = document.getElementById("includeNumbers");
const includeSymbolsElement = document.getElementById("includeSymbols");
const includeLettersElement = document.getElementById("includeLetters");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("passwordDisplay");
const btn = document.querySelector(".btn");

const UPPERCASE_CHAR_CODES = arrayFromLowToHigh(65, 90);
const LOWERCASE_CHAR_CODES = arrayFromLowToHigh(97, 122);
const NUMBER_CHAR_CODES = arrayFromLowToHigh(48, 57);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const characterAmount = characterAmountNumber.value;
  const includeUppercase = includeUppercaseElement.checked;
  const includeNumbers = includeNumbersElement.checked;
  const includeSymbols = includeSymbolsElement.checked;
  const includeLetters = includeLettersElement.checked;
  const password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols,
    includeLetters
  );
  passwordDisplay.innerText = password;
});

function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols,
  includeLetters
) {
  let charCodes = [];
  if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
  if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
  if (includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
  if (includeLetters) charCodes = charCodes.concat(LOWERCASE_CHAR_CODES);

  const passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode =
      charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}
const onLoad = () => {
  generatePassword(
    25,
    includeUppercaseElement.checked,
    includeNumbersElement.checked,
    includeSymbolsElement.checked,
    includeLettersElement.checked
  );
  passwordDisplay.innerText = generatePassword(
    25,
    includeUppercaseElement.checked,
    includeNumbersElement.checked,
    includeSymbolsElement.checked,
    includeLettersElement.checked
  );
};
onLoad();

function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

async function copy() {
  const password = passwordDisplay.innerText;
  await navigator.clipboard.writeText(password);
  alert("Le texte suivant a été copié: " + password);
}
const copyBtn = document.querySelector(".copy");

copyBtn.addEventListener("click", () => copy());
/**spin */
const spinBtn = document.getElementById("spin");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

spinBtn.addEventListener("click", async () => {
  await delay(5);
  spinBtn.style.transition = ".4s";
  spinBtn.style.transform = "rotate(720deg)";

  await delay(500);
  spinBtn.style.transition = ".0s";
  spinBtn.style.transform = "rotate(-360deg)";
});
