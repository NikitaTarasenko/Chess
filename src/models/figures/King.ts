import { Figure, FigureNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    if (
      (this.cell.isEmptyVertical(target) && (target.y === this.cell.y + 1 || target.y === this.cell.y - 1)) ||
      (this.cell.isEnemy(target) &&
        (target.y === this.cell.y + 1 || target.y === this.cell.y - 1) &&
        (target.x === this.cell.x + 1 || target.x === this.cell.x - 1 || target.x === this.cell.x))
    ) {
      return true;
    }
    if (
      (this.cell.isEmptyHorizontal(target) && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)) ||
      (this.cell.isEnemy(target) &&
        (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) &&
        (target.y === this.cell.y + 1 || target.y === this.cell.y - 1 || target.y === this.cell.y))
    ) {
      return true;
    }
    if (
      (this.cell.isEmptyDiagonal(target) &&
        (target.x === this.cell.x - 1 ||
          target.x === this.cell.x + 1 ||
          target.y === this.cell.y + 1 ||
          target.y === this.cell.y - 1)) 
    ) {
      return true;
    }

    return false;
  }
}
