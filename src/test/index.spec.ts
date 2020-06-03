function foo(): boolean {
  return true;
}

describe('simple tests suit', () => {
  it('should return true', () => {
    expect(foo()).toBe(true);
  });
});
