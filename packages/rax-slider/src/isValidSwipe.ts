export default (
  velocity: number,
  directionalChange: number,
  velocityThreshold: number,
  changeThreshold: number
) => {
  return (
    Math.abs(velocity) > velocityThreshold &&
    Math.abs(directionalChange) < changeThreshold
  );
};
