import * as React from "react";
import { Stage, Layer } from "react-konva";
import Villian from "Src/App/Components/Villian/Villian";
import Bullet from "Src/App/Components/CanvasElements/Bullet";
import { IHero } from "Src/App/Interfaces/IHero";
import { IVillian } from "Src/App/Interfaces/IVillian";
import getUniqueId from "Src/App/Utilities/Utilities";
import { IBullet } from "Src/App/Interfaces/IBullet";
import Hero from "Src/App/Components/Hero/Hero";
import { Direction } from "Src/App/Enums/Direction";

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
      positionY: 0,
      movingDirection: Direction.None
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
      Id: getUniqueId("hero"),
      positionY,
      positionX,
      movingDirection: Direction.None
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

  private handleUpdateHero = (hero: IHero) => {
    // Handle Hero Move
    const { stageWidth } = this.state;

    let positionX = hero.positionX;
    if (hero.movingDirection === Direction.Right) {
      positionX += 10;
    } else if (hero.movingDirection === Direction.Left) {
      positionX -= 10;
    }

    // Don't move when the position gets out of range
    if (positionX >= stageWidth - 50) {
      positionX = stageWidth - 50;
    }
    if (positionX <= 0) {
      positionX = 0;
    }

    if (hero.isFiring) {
      this.handleFire();
    }

    this.setState({
      hero: {
        ...this.state.hero,
        movingDirection: hero.movingDirection,
        positionX
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
            {hero && <Hero hero={hero} updateHero={this.handleUpdateHero} />}
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
