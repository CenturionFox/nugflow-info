//#region Interfaces

interface Rectangle {
  x: number,
  y: number,
  width: number,
  height: number
  collidedAny: boolean;

  isCollidedWith(other: Rectangle): boolean;
}

interface PooledItem {
  reset(): void;
}

interface Entity extends Rectangle, PooledItem {
  isAlive: boolean;
  age: number;

  update(): void;

  draw(): void;

  kill(): void;
}

interface Pool<T> {
  pool: T[];
  get(...args: any[]): T;
}

interface WeightedNode {
  path: string;
  weight: number;
}

interface TombstoneDefinition extends WeightedNode {
  soundSource: string;
  rubberness: number;
}

interface GlobalSettings {
  startingSpeed: number;
  audioVolume: number;
  tombstoneMaxAge: number;
}

//#endregion

//#region Data Definitions

const globalSettings = <GlobalSettings>{
  startingSpeed: 5,
  audioVolume: 0.45,
  tombstoneMaxAge: 1500
};

const bingoMp3 = new Audio('../res/bingo.mp3');
bingoMp3.load();
const snoofMp3 = new Audio('../res/snoof.mp3');
snoofMp3.load();
const oofMp3 = new Audio('../res/oof.mp3');
snoofMp3.load();
const oof2Mp3 = new Audio('../res/oof2.mp3');
snoofMp3.load();
const images: HTMLImageElement[] = [];

const tombstoneDefinitions = [
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/bstone.png", weight: 8 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/istone.png", weight: 8 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/nstone.png", weight: 8 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/gstone.png", weight: 8 },
  <TombstoneDefinition>{ rubberness: 0.5, soundSource: "../res/bingo.mp3", path: "../res/tombstones/ostone.png", weight: 8 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/eyestone.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/flowerstone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/pridestone.png", weight: 4 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/ghoststone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.3, soundSource: "../res/bingo.mp3", path: "../res/tombstones/moiststone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.6, soundSource: "../res/bingo.mp3", path: "../res/tombstones/ohnostone.png", weight: 4 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/oof.mp3", path: "../res/tombstones/oofstone.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/oof2.mp3", path: "../res/tombstones/oofstone.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.25, soundSource: "../res/snoof.mp3", path: "../res/tombstones/snoofstone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/thinkstone.png", weight: 4 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/tombstone.png", weight: 64 },
  <TombstoneDefinition>{ rubberness: 0.01, soundSource: "../res/bingo.mp3", path: "../res/tombstones/tombstowone.png", weight: 4 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/weirdseedstone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/transstone.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/heartstone.png", weight: 4 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/blankstone.png", weight: 16 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/shortstone.png", weight: 4 },
  <TombstoneDefinition>{ rubberness: 0, soundSource: "../res/bingo.mp3", path: "../res/tombstones/wolfstone.png", weight: 8 },
  <TombstoneDefinition>{ rubberness: 0, soundSource: "../res/bingo.mp3", path: "../res/tombstones/oldwolfstone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/sideeyestone.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.6, soundSource: "../res/bingo.mp3", path: "../res/tombstones/googlystone.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.15, soundSource: "../res/bingo.mp3", path: "../res/tombstones/nottombfine.png", weight: 2 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/seestone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/seestone1.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/seestone2.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/seestone3.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/seestone4.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/frankerfacestone.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/bingo.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/bingobox.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/fancybingo.png", weight: 1 },
  <TombstoneDefinition>{ rubberness: 0.1, soundSource: "../res/bingo.mp3", path: "../res/tombstones/buffstone.png", weight: 1 },
];
tombstoneDefinitions.forEach(def => {
  const img = new Image();
  img.src = def.path;
  img.onload = () => console.log('Loaded', def.path);
  images.push(img);
});

//#endregion

//#region Utility Functions

function getLocalPath(path: string) {
  var [, , localPath] = path.match(/^(https?\:\/\/[^\/]+\/|\.\.\/)(.+)$/)

  return '../'.concat(localPath);
}

//#endregion

// #region Singleton Classes

class WeightedTombstones {
  private _totalSize: number = undefined;

  getTotalSize(): number {
    if (!this._totalSize) {
      var i = 0;
      tombstoneDefinitions.forEach(tombstone => {
        i += tombstone.weight;
      });
      this._totalSize = i;
    }
    return this._totalSize + 1;
  }

  getRandomTombstone(): TombstoneDefinition {
    var index = Math.floor(Math.random() * this.getTotalSize());
    var k = 0;
    var selected: TombstoneDefinition;

    tombstoneDefinitions.forEach(tombstone => {
      if (selected) return;
      if (tombstone.weight + k >= index) {
        selected = tombstone;
      } else {
        k += tombstone.weight;
      }
    });

    return selected;
  }
}

const weightedTombstones = new WeightedTombstones();

//#endregion

//#region Pools

class AudioPool implements Pool<HTMLAudioElement> {
  pool: HTMLAudioElement[] = [];

  get(source: string): HTMLAudioElement {
    var pooledAudio: HTMLAudioElement;

    this.pool.forEach(audio => {
      if (pooledAudio) return;

      if (audio.currentTime == 0 && getLocalPath(audio.currentSrc) == getLocalPath(source)) {
        pooledAudio = audio;
      }
    })

    if (!pooledAudio) {
      pooledAudio = new Audio(source);
      pooledAudio.onended = () => {
        pooledAudio.pause();
        pooledAudio.currentTime = 0;
      }
      pooledAudio.load();
      this.pool.push(pooledAudio);
    }

    return pooledAudio;
  }
}

const audioPool = new AudioPool();

class TombstonePool implements Pool<Tombstone> {
  pool: Tombstone[] = [];

  get(x: number): Tombstone {
    var pooled: Tombstone;

    this.pool.forEach(item => {
      if (pooled) return;
      if (!item.isAlive) {
        pooled = item;
        pooled.x = x;
        pooled.reset();
      }
    });
    if (!pooled) {
      pooled = new Tombstone(x);
      this.pool.push(pooled);
    }

    return pooled;
  }


}

const tombstonePool = new TombstonePool();

//#endregion

//#region Entity Types

class Tombstone implements Entity {
  isAlive: boolean;
  age: number;

  y: number;
  width: number;
  height: number;
  collidedAny: boolean;

  speed: number;
  opacity: number;

  tombstoneType: TombstoneDefinition;

  tombstone: HTMLImageElement;
  imageLoaded: boolean;

  shine: Shine;

  constructor(public x: number) {
    this.reset();
  }

  reset(): void {
    this.speed = globalSettings.startingSpeed + Math.floor(10 * Math.random());
    this.opacity = 1;
    this.age = 0;
    this.isAlive = true;
    this.y = 0;
    this.collidedAny = false;
    this.imageLoaded = false;

    this.tombstoneType = weightedTombstones.getRandomTombstone();

    this.tombstone = new Image();
    this.tombstone.src = this.tombstoneType.path;
    if (!this.tombstone.complete) {
      this.tombstone.style.visibility = 'hidden';
      this.tombstone.onload = this.imageDoneLoading.bind(this);
    } else {
      this.imageDoneLoading();
    }

    this.tombstone.classList.value = 'tombstone';
    document.body.appendChild(this.tombstone);
  }

  imageDoneLoading() {
    this.x -= this.tombstone.width / 2;
    this.width = this.tombstone.width;
    this.height = this.tombstone.height;
    this.y -= this.tombstone.height;

    if (!this.shine) {
      this.shine = new Shine(this.x, this.width);
    } else {
      this.shine.x = this.x;
      this.shine.width = this.width;
      this.shine.reset();
    }

    this.imageLoaded = true;

    this.tombstone.style.top = this.y + "px";
    this.tombstone.style.left = this.x + "px";
    this.tombstone.style.opacity = `${this.opacity}`;
    this.tombstone.style.visibility = "visible";

    var bingo = audioPool.get(this.tombstoneType.soundSource);
    bingo.volume = globalSettings.audioVolume;
    bingo.play();
  }

  update(): void {
    if (!this.imageLoaded) return;

    if (this.shine) this.shine.update();
    this.age++;
    if (this.y < window.innerHeight - this.tombstone.height) {
      if (!this.collidedAny) {
        this.y += this.speed;
        if (this.age % 15 == 0) {
          this.speed++
        }
      }
      else { this.speed = this.speed * -this.tombstoneType.rubberness; }
    } else {
      this.speed = this.speed * -this.tombstoneType.rubberness;
      this.y = window.innerHeight - this.tombstone.height;
      if(Math.abs(this.speed) >= 1) {
        this.y -= this.tombstoneType.rubberness;
      } else {
        this.speed = 0;
      }
    }
    if (this.age >= globalSettings.tombstoneMaxAge - 500 && this.age < globalSettings.tombstoneMaxAge) {
      this.speed = 1;
      this.opacity -= 0.005;
      if (this.opacity <= 0) {
        this.opacity = 0;
      }
    }
    if (this.age >= globalSettings.tombstoneMaxAge) {
      this.kill();
    }
  }

  resolveCollision(maxY: number) {

  }

  draw(): void {
    this.tombstone.style.visibility = this.imageLoaded ? "visible" : "hidden";
    this.tombstone.style.left = `${this.x}px`;
    this.tombstone.style.top = `${this.y}px`;
    this.tombstone.style.opacity = `${this.opacity}`;
    if (this.shine) this.shine.draw();
  }

  kill(): void {
    this.isAlive = false;
    this.age = 0;
    if (this.tombstone.remove) {
      return this.tombstone.remove();
    }
    document.body.removeChild(this.tombstone);
  }

  isCollidedWith(other: Rectangle): boolean {

    var tombstone = other as Tombstone;

    if (!tombstone) return false;

    if (this.opacity < 0.25 || tombstone.opacity < 0.25 || tombstone.age < 1 || this.age < 1) {
      return false
    }

    if (this.y <= tombstone.y &&
      this.y + this.tombstone.height >= tombstone.y) {
      if ((this.x >= tombstone.x &&
        this.x <= tombstone.x + tombstone.tombstone.width) ||
        tombstone.x >= this.x && tombstone.x <= this.x + this.tombstone.width) {

        this.y = tombstone.y - this.tombstone.height + 1

        const otherOldSpeed = tombstone.speed
        const myOldSpeed = this.speed

        tombstone.speed = Math.max(otherOldSpeed, myOldSpeed)
        this.speed = Math.min(otherOldSpeed, myOldSpeed) + (1 * -this.tombstoneType.rubberness)

        if(Math.abs(this.speed) >= 1) {
          this.y -= this.tombstoneType.rubberness;
        } else {
          this.speed = 0;
        }
        return true;
      }
    }
    return false;
  }
}

class Shine implements Entity {

  isAlive: boolean;
  age: number;
  y: number;
  height: number;
  collidedAny: boolean;

  shine: HTMLDivElement;
  opacity: number;
  xStart: number;
  widthStart: number;

  constructor(public x: number, public width: number) {
    this.reset();
  }

  reset(): void {
    this.opacity = 0.75;
    this.age = 0;
    this.height = 16000 + window.innerHeight;
    this.y = -8000;
    this.xStart = this.x;
    this.widthStart = this.width;
    this.isAlive = true;
    this.collidedAny = false;
    this.shine = document.createElement('div');
    document.body.appendChild(this.shine);
    this.shine.classList.value = 'shine';
    this.shine.style.left = `${this.x}px`;
    this.shine.style.top = `${this.y}px`;
    this.shine.style.opacity = `${this.opacity}`;
    this.shine.style.width = `${this.width}px`;
    this.shine.style.height = `${this.height}px`;
  }

  update(): void {
    this.age++;
    if (this.opacity > 0) {
      this.opacity -= 0.005;
      if (this.width > 0 && this.age % 2 == 0) {
        this.width--;
        this.x = this.xStart + ((this.widthStart - this.width) / 2);
      }
    }

    if (this.age >= 200) {
      this.kill();
    }
  }

  draw(): void {
    this.shine.style.left = `${this.x}px`;
    this.shine.style.top = `${this.y}px`;
    this.shine.style.width = `${this.width}px`;
    this.shine.style.height = `${this.height}px`;
    this.shine.style.opacity = `${this.opacity}`;
  }

  kill(): void {
    this.isAlive = false;
    if (this.shine.remove) {
      return this.shine.remove();
    }
    document.body.removeChild(this.shine);
  }

  isCollidedWith(_other: Rectangle) { return false; }
}

//#endregion

//#region Main Functionality

const entities: Entity[] = [];

function main() {
  document.body.style.height = window.innerHeight + "px";
  document.getElementById('overlay').onclick = (ev: MouseEvent) => tombstone(ev.clientX);

  setInterval(drawLoop, 16);
  setInterval(updateLoop, 10);
  setInterval(moveShadow, 1500);
}

var shadow = [10, 10];

function moveShadow() {
  if (shadow[0] == 10) {
    if (shadow[1] == -10) {
      shadow[1] = 10
    } else {
      shadow[0] = -10
    }
  } else {
    if (shadow[1] == -10) {
      shadow[0] = 10
    } else {
      shadow[1] = -10
    }
  }

  document.getElementById('bingo').style.textShadow = `#ff375e ${shadow[0]}px ${shadow[1]}px`;
}

function updateLoop() {
  if (Math.random() > 0.999) {
    tombstone(Math.floor(Math.random() * innerWidth));
  }

  document.body.style.height = window.innerHeight + "px";

  entities.forEach(entity => {
    if (!entity.isAlive) return;
    entity.collidedAny = false;
    entities.forEach(other => {
      if (other.isAlive && other !== entity) {
        entity.collidedAny = entity.isCollidedWith(other);
      }
    });
    entity.update();
  });
}

function drawLoop() {
  entities.forEach(entity => {
    if (!entity.isAlive) return;
    entity.draw()
  });
}

function tombstone(xPos: number) {
  var tombstone = tombstonePool.get(xPos);
  if (entities.indexOf(tombstone) < 0) entities.push(tombstone);
}

function showMenu() {
  document.getElementById('settingsMenu').style.visibility = 'visible';
  document.getElementById('menu').style.visibility = 'hidden';
}

function hideMenu() {
  document.getElementById('settingsMenu').style.visibility = 'hidden';
  document.getElementById('menu').style.visibility = 'visible';
}


//#endregion