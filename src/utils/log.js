export const log = (key, value) => {
  console.log(
    '\u001b[1;36m',
    JSON.stringify(value, null, 1),
    '\u001b[1;32m',
    key,
  );
};
