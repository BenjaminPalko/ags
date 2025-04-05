export const Mathf = {
  clamp: (value: number, min: number, max: number) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  },
  sign: (value: number) => {
    if (value > 0) return 1;
    if (value < 0) return -1;
    return 0;
  },
};
