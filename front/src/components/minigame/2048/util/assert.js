export const assert = (condition, message) => {
  // 컨디션 만족 x 에러 throw
  console.log("assert 실행");
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
};
