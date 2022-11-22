export function calcAspectRatio(srcWidth: number, srcHeight: number) {
  const ratio = Math.min(
    window.innerWidth / srcWidth,
    window.innerHeight / srcHeight
  );

  return { width: srcWidth * ratio, height: srcHeight * ratio };
}
