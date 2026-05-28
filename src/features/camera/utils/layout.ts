/**
 * Returns the empty space below the centered camera preview.
 *
 * The remaining vertical space is split equally above and below the preview
 * because the camera uses `contain` and is centered in the available area.
 */
export function getSpaceBelowCameraPreview(
  screenHeight: number,
  bottomNavHeight: number,
  cameraPreviewHeight: number,
): number {
  return (screenHeight - cameraPreviewHeight - bottomNavHeight) / 2;
}