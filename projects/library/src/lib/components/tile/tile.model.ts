import { Dimensions, Image, Coordinates } from '../../shared/models';

export class Tile {
    cellHeight = 0;
    cellWidth = 0;
    color = '#fff';
    index = 0;
    name = '';
    src = '';
    text = '';

    _coordinates: Coordinates = new Coordinates();
    _dimensions: Dimensions = new Dimensions();
    _image: Image = new Image();

    get id(): number {
        return this.index + this.imageId * .0001;
    }

    get approxRatio(): number {
        return this.rows * this.cellHeight / this.columns * this.cellWidth;
    }

    get columns(): number {
        return this.dimensions.columns;
    }

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

    get height(): number {
        return this.rows * this.cellHeight;
    }

    get heightScale(): number {
        return (this.rows * this.cellHeight) / this.image.height;
    }

    get image(): Image {
        return this._image || new Image();
    }

    set image(value: Image) {
        this._image = value;
    }

    get imageHeight(): number {
        return this.image.height * this.scale;
    }

    get imageId(): number {
        return this.image.id;
    }

    get imageSrc(): string {
        return this.image.src;
    }

    get imageWidth(): number {
        return this.image.width * this.scale;
    }

    get positionLeft(): number {
        return this.startColumn * this.cellWidth;
    }

    get positionTop(): number {
        return this.startRow * this.cellHeight;
    }

    get ratio(): number {
        return this.dimensions.ratio;
    }

    get rows(): number {
        return this.dimensions.rows;
    }

    get scale(): number {
        return this.heightScale >= this.widthScale ? this.heightScale : this.widthScale;
    }

    get startColumn(): number {
        return this.coordinates.column;
    }

    get startRow(): number {
        return this.coordinates.row;
    }

    get width(): number {
        return this.columns * this.cellWidth;
    }

    get widthScale(): number {
        return (this.columns * this.cellWidth) / this.image.width;
    }

}
