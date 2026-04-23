export const calcSizeUnderCamera = (
  screenHeight: number,
  bottomNavHeight: number,
  cameraPreviewHeight: number,
): number => {
  return (screenHeight - cameraPreviewHeight - bottomNavHeight) / 2;
  // DZIELIMY TUTAJ PRZEZ DWA PONIEWAZ RESZTA JAKA NAM ZOSTAJE TO TAKI SAM OBSZAR NA GORZE I NA DOLA (NAD I POD CAMERA) -
  // - a my tutaj potrzebujemy okreslic wielkosc dolu
  // (sa rowne dzieki zastosowaniu contain w resizeMode w komponencie kamery ktory ustawia preview dokaldnie na srodku wolnego obszaru)
};
