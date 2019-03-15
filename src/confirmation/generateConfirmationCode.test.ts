import { generateConfirmationCode } from "./generateConfirmationCode";

const testIds = [
  "2QjrgjTXT6Mx0L50HX0H",
  "41CRWk6lrgJGEuENo0Sm",
  "AIjjFguKI9l31glGdVqC",
  "H3rIkaMobm5CGXfNWriJ",
  "JY0H73abIYm0h7vPdfpw",
  "NEqaul9HDq4Vg1JYkW7W",
  "NH4SRI3HQGR0L6xB91bR",
  "VoUnZK72uLInqEbz7jds",
  "XRHS3GRmpJjRWcTBqyHS",
  "ifCiXPoKLvtsayMYDo4K",
  "l7E1Upi8kYtNUaGKHMsO",
  "n0EvElr0KGyCrT4PW7N2",
  "psmW89hcqCUT6NDpnGlj",
  "rLogL71WwtiyQbsRco5J",
  "sl7QQjWizbEImA0np4JY",
  "vi8JBJs1m2OavDyiidnM",
  "zopQDGz9SbowjrUtdQSC"
];

it("does not return empty", () => {
  const codes = testIds.map(generateConfirmationCode);
  testIds.forEach(id => {
    const code = generateConfirmationCode(id);
    if (code == "") {
      console.log("Created empty code for: ", id);
    }
  });
  codes.forEach(code => expect(code).not.toBeUndefined());
  codes.forEach(code => expect(code).not.toBe(""));
});

it("returns a shorter code than the original", () => {
  const originalCode = "l7E1Upi8kYtNUaGKHMsO";
  const newCode = generateConfirmationCode(originalCode);
  expect(newCode.length).toBeLessThan(originalCode.length);
});

it("returns a consistent result", () => {
  const originalCode = "l7E1Upi8kYtNUaGKHMsO";
  const newCode = generateConfirmationCode(originalCode);
  expect(newCode).toBe("QhbUGe");
});

it("returns fairly unique codes", () => {
  const codes = testIds.map(generateConfirmationCode);
  codes.forEach(code => {
    const matches = codes.filter(i => i === code);
    expect(matches.length).toBe(1);
  });
});
