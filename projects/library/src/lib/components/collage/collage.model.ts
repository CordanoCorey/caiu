import { Tile } from '../tile/tile.model';
import { Image, Dimensions, Coordinates } from '../../shared/models';
import { integerArray, positiveIntegerArray, build, inArray } from '../../shared/utils';

export class Collage {
    canvasHeight = 0;
    canvasWidth = 0;
    cellHeight = 0;
    cellWidth = 0;
    maxColumns = 4;
    maxRows = 4;
    tileDimensions: Dimensions[] = [];
    totalColumns = 0;
    totalRows = 0;
    _cells: number[][];
    _images: Image[] = [];
    _tiles: Tile[] = [];

    /**
     * Build new collage instance with given parameters.
     * @param images 
     * @param canvasHeight 
     * @param canvasWidth 
     * @param totalRows 
     * @param totalColumns 
     * @param maxRows 
     * @param maxColumns 
     */
    static Build(images: Image[], canvasHeight, canvasWidth, totalRows = 0, totalColumns = 0, maxRows = 0, maxColumns = 0): Collage {
        const cellHeight = canvasHeight / totalRows;
        const cellWidth = canvasWidth / totalColumns;
        const tileDimensions = Collage.GetTileDimensions(cellHeight, cellWidth, maxRows, maxColumns);
        const collage = Object.assign(new Collage(), {
            canvasHeight,
            canvasWidth,
            totalRows,
            totalColumns,
            maxRows,
            maxColumns,
            cellHeight,
            cellWidth,
            tileDimensions,
        });
        collage.images = images;
        return collage;
    }

    /**
     * Build array of all possible dimensions for a single tile in the collage.
     * @param cellHeight 
     * @param cellWidth 
     * @param maxRows 
     * @param maxColumns 
     */
    static GetTileDimensions(cellHeight: number, cellWidth: number, maxRows: number, maxColumns: number): Dimensions[] {
        return positiveIntegerArray(maxRows).reduce((acc, x) => {
            const dimensions = positiveIntegerArray(maxColumns)
                .map(y => build(Dimensions, {
                    rows: x,
                    columns: y,
                    height: x * cellHeight,
                    width: y * cellWidth
                }));
            return [...acc, ...dimensions];
        }, []);
    }

    get cells(): number[][] {
        return this._cells || this.emptyCells;
    }

    get emptyCells(): number[][] {
        return integerArray(this.totalRows).map(x => integerArray(this.totalColumns).map(y => 0));
    }

    get images(): Image[] {
        return this._images;
    }

    set images(value: Image[]) {
        this._images = value.map((img, index) => Image.BuildForTile(img, this.tileDimensions, index));
        console.dir(this.images);
        console.dir(this.tiles);
        console.dir(this);
    }

    get tiles(): Tile[] {
        return integerArray(this.totalCells)
            .reduce((acc, i) => this.isCellFilled(i) ? acc : [...acc, this.fillCell(i)], []);
    }

    get totalCells(): number {
        return this.totalRows * this.totalColumns;
    }

    private buildTile(image: Image, dimensions: Dimensions, coordinates: Coordinates): Tile {
        const t = build(Tile, {
            image,
            dimensions,
            coordinates,
            cellHeight: this.cellHeight,
            cellWidth: this.cellWidth
        });
        console.log(
            '\n\nStart Row:\t', t.startRow,
            '\nColumn:\t', t.startColumn,
            '\nRows:\t', t.rows,
            '\nColumns:\t', t.columns,
        );
        return t;
    }

    private fillCell(index: number): Tile {
        const coordinates = this.findCoordinates(index);
        const dim = this.findAvailableDimensions(coordinates.row, coordinates.column);
        console.dir(dim);
        return this.images.reduce((acc, image, i) => {
            if (acc) {
                return <Tile>acc;
            }
            const dimensions = this.findImageDimensions(image, dim);
            console.dir(dimensions);
            if (dimensions) {
                this.reorderImages(i);
                const tile = this.buildTile(image, dimensions, coordinates);
                tile.index = index;
                console.dir(tile);
                this.markCellsFilled(tile);
                return tile;
            }
            return null;
        }, <Tile>null);
    }

    private findAvailableColumns(startRow: number, startColumn: number): number {
        return Math.max(...positiveIntegerArray(this.maxColumns)
            .map(k => k <= this.maxColumns && startColumn + k <= this.totalColumns && this.cells[startRow] && this.cells[startRow][startColumn + k] ? k : 1));
    }

    private findAvailableRows(startRow: number, startColumn: number): number {
        return Math.max(...positiveIntegerArray(this.maxRows)
            .map(k => k <= this.maxRows && startRow + k <= this.totalRows && this.cells[startRow + k] && this.cells[startRow + k][startColumn] ? k : 1));
    }

    private findAvailableDimensions(startRow: number, startColumn: number): Dimensions[] {
        const availableRows = this.findAvailableRows(startRow, startColumn);
        const availableColumns = this.findAvailableColumns(startRow, startColumn);
        return this.tileDimensions.filter(x => x.rows <= availableRows && x.columns <= availableColumns);
    }

    private findCoordinates(index: number): Coordinates {
        const remainder = (index + this.totalColumns) % this.totalColumns;
        return {
            row: (index - remainder) / this.totalColumns,
            column: remainder
        };
    }

    private findImageDimensions(image: Image, dim: Dimensions[]): Dimensions {
        return image.dimensions.find(x => inArray(dim, x));
    }

    private generateTileId(tile: Tile): number {
        return tile.index * 1000 + tile.imageId;
    }

    private isCellFilled(index: number): boolean {
        const coordinates = this.findCoordinates(index);
        return this.cells[coordinates.row][coordinates.column] !== 0;
    }

    private markCellsFilled(tile: Tile) {
        const coordinates = this.findCoordinates(tile.index);
        const tileId = this.generateTileId(tile);
        for (let i = 0; i < tile.rows; i++) {
            this.cells[coordinates.row + i][coordinates.column] = tileId;
        }
        for (let j = 0; j < tile.columns; j++) {
            this.cells[coordinates.row][coordinates.column + j] = tileId;
        }
        console.dir(this.cells);
    }

    private reorderImages(index: number) {
        this._images = [...this._images.filter((img, i) => i !== index), this._images[index]];
    }

}
