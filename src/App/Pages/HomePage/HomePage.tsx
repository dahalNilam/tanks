import * as React from "react";
import { Stage, Layer } from "react-konva";
import Hero from "Src/App/Components/Hero/Hero";
import Villian from "Src/App/Components/Villian/Villian";
import Bullet from "Src/App/Components/CanvasElements/Bullet";
import { IHero } from "Src/App/Interfaces/IHero";
import { IVillian } from "Src/App/Interfaces/IVillian";
import getUniqueId from "Src/App/Utilities/Utilities";
import { IBullet } from "Src/App/Interfaces/IBullet";

interface IState {
  stageWidth: number;
  stageHeight: number;
  bullets: IBullet[];
  villians: IVillian[];
  hero: IHero;
}

export default class Homepage extends React.Component {
  private backGroundRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    window.addEventListener("resize", this.initializeGame);
    this.initializeGame();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.initializeGame);
  }

  public readonly state: IState = {
    stageWidth: 500,
    stageHeight: 500,
    bullets: [],
    hero: {
      Id: "hero",
      positionX: 0,
      positionY: 0
    },
    villians: []
  };

  private initializeGame = () => {
    this.initializeStage();
  };

  private initializeStage = () => {
    const backGroundNode = this.backGroundRef.current;

    if (!backGroundNode) {
      return;
    }

    const stageWidth = backGroundNode.offsetWidth;
    const stageHeight = backGroundNode.offsetHeight;

    this.setState(
      {
        stageWidth,
        stageHeight
      },
      () => {
        this.initializeHero();
        this.initializeVillians();
      }
    );
  };

  private initializeHero = () => {
    const { stageWidth, stageHeight } = this.state;
    const positionX = stageWidth / 2 - 25;
    const positionY = stageHeight - 60;

    const hero: IHero = {
      positionY,
      positionX,
      Id: getUniqueId("hero")
    };

    this.setState({
      hero
    });
  };

  private initializeVillians = () => {
    const { stageWidth } = this.state;

    const positionX = stageWidth / 2 - 25;
    const positionY = 10;

    const villian: IVillian = {
      positionY,
      positionX,
      Id: getUniqueId("villian")
    };

    const villians: IVillian[] = [villian];

    this.setState({
      villians
    });
  };

  private updateBulletPosition = (bullet: IBullet) => {
    if (bullet.positionY <= 60) {
      const newBullets = this.state.bullets.filter(p => p.Id === bullet.Id);

      this.setState({
        bullets: newBullets
      });
    }
  };

  private handleRemoveBulletById = (id: string) => {
    const newBullets = this.state.bullets.filter(p => p.Id !== id);
    this.setState({
      bullets: newBullets
    });
  };

  private handleUpdateVillianPosition = (villian: IBullet) => {};

  private handleFire = () => {
    const { positionX, positionY } = this.state.hero;
    const bulletInitialPositionX = positionX + 26;
    const bulletInitialPositionY = positionY - 10;

    const newBullet: IBullet = {
      Id: getUniqueId("bullet"),
      positionX: bulletInitialPositionX,
      positionY: bulletInitialPositionY
    };

    const bullets = [...this.state.bullets, newBullet];

    this.setState({
      bullets
    });
  };

  private handleMoveHero = (distance: number) => {
    const { hero, stageWidth } = this.state;
    const newPositionX = hero.positionX + distance;

    // Don't move when the position gets out of range
    if (newPositionX >= stageWidth - 50 || newPositionX <= 0) {
      return;
    }

    this.setState({
      hero: {
        ...this.state.hero,
        positionX: newPositionX
      }
    });
  };

  public render() {
    const { stageWidth, stageHeight, villians, hero, bullets } = this.state;

    return (
      <div
        style={{
          textAlign: "center",
          margin: "auto",
          width: "50%",
          border: "1px solid grey"
        }}
        ref={this.backGroundRef}
      >
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            {hero && (
              <Hero
                key={hero.Id}
                hero={hero}
                stageWidth={stageWidth}
                stageHeight={stageHeight}
                handleFire={this.handleFire}
                handleMove={this.handleMoveHero}
              />
            )}
            {villians &&
              villians.length > 0 &&
              villians.map(villian => (
                <Villian
                  key={villian.Id}
                  villian={villian}
                  updateVillianPosition={this.handleUpdateVillianPosition}
                />
              ))}

            {bullets &&
              bullets.length > 0 &&
              bullets.map(bullet => (
                <Bullet
                  key={bullet.Id}
                  bullet={bullet}
                  removeBulletById={this.handleRemoveBulletById}
                />
              ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}
