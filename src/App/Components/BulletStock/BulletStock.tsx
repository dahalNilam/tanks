import React from "react";

interface IProps {
  bulletsLeft: number;
}

export default function BulletStock({ bulletsLeft }: IProps) {
  return (
    <div style={{ flex: 2, textAlign: "center" }}>
      <h3>Bullets Left</h3>
      {bulletsLeft < 1 ? <>Out of Ammo</> : bulletsLeft}
    </div>
  );
}
