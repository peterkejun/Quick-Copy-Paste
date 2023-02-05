export const getJwtSecret = (): string => {
  return process.env.JWT_SECRET;
};
