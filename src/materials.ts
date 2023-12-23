import { Color, MeshStandardMaterial } from "three";

export const whiteMaterial = new MeshStandardMaterial({
  color: new Color(),
});
export const blueMaterial = new MeshStandardMaterial({
  color: new Color(0x466999),
  roughness: 0.4,
});
export const skinMaterial = new MeshStandardMaterial({
  color: new Color(0xf5d2a4),
  roughness: 0.6,
});
export const brownMaterial = new MeshStandardMaterial({
  color: new Color("brown"),
  roughness: 0.6,
});
export const navyMaterial = new MeshStandardMaterial({
  color: new Color(0x304a6e),
  roughness: 0.6,
});
