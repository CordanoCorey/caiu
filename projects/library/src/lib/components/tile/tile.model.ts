import { Dimensions, Image, Coordinates } from '../../shared/models';

export class Tile {
    id = 0;
    cellHeight = 0;
    cellWidth = 0;
    color = '#fff';
    name = '';
    src = '';
    text = '';

    _coordinates: Coordinates = new Coordinates();
    _dimensions: Dimensions = new Dimensions();
    _image: Image = new Image();

    get coordinates(): Coordinates {
        return this._coordinates || new Coordinates();
    }

    set coordinates(value: Coordinates) {
        this._coordinates = value;
    }

    get dimensions(): Dimensions {
        return this._dimensions || new Dimensions();
    }

    set dimensions(value: Dimensions) {
        this._dimensions = value;
    }

    get image(): Image {
        return this._image || new Image();
    }

    set image(value: Image) {
        this._image = value;
    }

    get height(): number {
        return this.rows * this.cellHeight;
    }

    get width(): number {
        return this.columns * this.cellWidth;
    }

    get imageSrc(): string {
        return this.image.src;
    }

    get imageHeight(): number {
        return this.image.height * this.scale;
    }

    get imageWidth(): number {
        return this.image.width * this.scale;
    }

    get rows(): number {
        return this.dimensions.rows;
    }

    get columns(): number {
        return this.dimensions.columns;
    }

    get positionTop(): number {
        return this.startRow * this.cellHeight;
    }

    get positionLeft(): number {
        return this.startColumn * this.cellWidth;
    }

    get approxRatio(): number {
        return this.rows * this.cellHeight / this.columns * this.cellWidth;
    }

    get ratio(): number {
        return this.dimensions.ratio;
    }

    get scale(): number {
        return this.heightScale >= this.widthScale ? this.heightScale : this.widthScale;
    }

    get heightScale(): number {
        return (this.rows * this.cellHeight) / this.image.height;
    }

    get widthScale(): number {
        return (this.columns * this.cellWidth) / this.image.width;
    }

    get startRow(): number {
        return this.coordinates.row;
    }

    get startColumn(): number {
        return this.coordinates.column;
    }

}
