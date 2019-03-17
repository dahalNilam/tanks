import * as React from "react";
import { Stage, Layer } from "react-konva";
import Villian from "Src/App/Components/Villian/Villian";
import Bullet from "Src/App/Components/Bullet/Bullet";
import { IHero } from "Src/App/Interfaces/IHero";
import { IVillian } from "Src/App/Interfaces/IVillian";
import { getUniqueId } from "Src/App/Utilities/Utilities";
import { IBullet } from "Src/App/Interfaces/IBullet";
import Hero from "Src/App/Components/Hero/Hero";
import { Direction } from "Src/App/Enums/Direction";

interface IProps {
  increaseScore: () => void;
  resetScore: () => void;
  style?: {};
}

interface IState {
  stageWidth: number;
  stageHeight: number;
  bullets: IBullet[];
  villians: IVillian[];
  hero: IHero;
}

export default class GameStage extends React.Component<IProps, IState> {
  private backGroundRef = React.createRef<HTMLDivElement>();

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

  public componentDidMount() {
    window.addEventListener("resize", this.initializeStage);
    this.initializeStage();
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.initializeStage);
  }

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
    const hero: IHero = {
      Id: getUniqueId("hero"),
      positionX: this.state.stageWidth / 2 - 25,
      positionY: this.state.stageHeight - 60,
      movingDirection: Direction.None
    };

    this.setState({
      hero
    });
  };

  private initializeVillians = () => {
    const villian: IVillian = {
      positionY: 10,
      positionX: this.state.stageWidth / 2 - 25,
      Id: getUniqueId("villian"),
      movingDirection: Direction.Right
    };

    this.setState({
      villians: [villian]
    });
  };

  private handleUpdateBullet = (bullet: IBullet) => {
    if (bullet.positionY <= 0) {
      this.removeBulletById(bullet.Id);
      this.removeBulletById(bullet.Id);
    }

    const bullets = this.state.bullets.map(
      b => (b.Id === bullet.Id ? bullet : b)
    );

    this.setState({
      bullets
    });

    this.removeVillianIfHit(this.state.villians, this.state.bullets);
  };

  private removeVillianIfHit = (villians: IVillian[], bullets: IBullet[]) => {
    for (let i = 0; i < villians.length; i++) {
      const villian = villians[i];

      for (let j = 0; j < bullets.length; j++) {
        const bullet = bullets[j];

        const isHit =
          bullet.positionX + 10 > villian.positionX &&
          bullet.positionY < villian.positionY + 50 &&
          bullet.positionX < villian.positionX + 50;

        if (isHit) {
          this.removeVillianById(villian.Id);
          this.removeBulletById(bullet.Id);

          this.props.increaseScore();
          this.initializeVillians();
        }

        return isHit;
      }
    }

    return false;
  };

  private removeVillianById(id: string) {
    const villians = this.state.villians.filter(p => p.Id !== id);

    this.setState({ villians });
  }

  private removeBulletById = (id: string) => {
    const bullets = this.state.bullets.filter(p => p.Id !== id);

    this.setState({
      bullets
    });
  };

  private handleUpdateVillian = (villian: IVillian) => {
    if (villian.movingDirection === Direction.Left) {
      villian.positionX -= 3;
    } else {
      villian.positionX += 3;
    }

    if (villian.positionX >= this.state.stageWidth - 50) {
      villian.movingDirection = Direction.Left;
    }
    if (villian.positionX <= 0) {
      villian.movingDirection = Direction.Right;
    }

    const villians = this.state.villians.map(
      p => (p.Id === villian.Id ? villian : p)
    );

    this.setState({
      villians
    });
  };

  private handleFire = () => {
    const { positionX, positionY } = this.state.hero;
    const bulletInitialPositionX = positionX + 26;
    const bulletInitialPositionY = positionY - 10;

    const bullet: IBullet = {
      Id: getUniqueId("bullet"),
      positionX: bulletInitialPositionX,
      positionY: bulletInitialPositionY
    };

    const bullets = [...this.state.bullets, bullet];

    this.setState({
      bullets
    });
  };

  private handleUpdateHero = (hero: IHero) => {
    if (hero.movingDirection === Direction.Right) {
      const maxPosX = this.state.stageWidth - 50;

      hero.positionX =
        hero.positionX >= maxPosX ? maxPosX : hero.positionX + 10;
    } else if (hero.movingDirection === Direction.Left) {
      const minPosX = 0;

      hero.positionX =
        hero.positionX <= minPosX ? minPosX : hero.positionX - 10;
    }

    if (hero.isFiring) {
      this.handleFire();
    }

    this.setState({
      hero
    });
  };

  public render() {
    const { stageWidth, stageHeight, villians, hero, bullets } = this.state;

    return (
      <div style={this.props.style} ref={this.backGroundRef}>
        <Stage width={stageWidth} height={stageHeight}>
          <Layer>
            {hero && <Hero hero={hero} updateHero={this.handleUpdateHero} />}
            {villians &&
              villians.length > 0 &&
              villians.map(villian => (
                <Villian
                  key={villian.Id}
                  villian={villian}
                  updateVillian={this.handleUpdateVillian}
                />
              ))}

            {bullets &&
              bullets.length > 0 &&
              bullets.map(bullet => (
                <Bullet
                  key={bullet.Id}
                  bullet={bullet}
                  updateBullet={this.handleUpdateBullet}
                />
              ))}
          </Layer>
        </Stage>
      </div>
    );
  }
}
