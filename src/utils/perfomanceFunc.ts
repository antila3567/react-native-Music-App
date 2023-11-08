export const performanceFunc = (funcToCheck) => {
  const t0 = global.performance.now();
  funcToCheck();
  const t1 = global.performance.now();

  console.log(t1 - t0, 'milliseconds');
};
