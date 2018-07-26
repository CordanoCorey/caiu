import { Tile } from '../tile/tile.model';
import { Image, Dimensions, Coordinates } from '../../shared/models';
import { integerArray, positiveIntegerArray } from '../../shared/utils';

export class Collage {
    canvasHeight = 0;
    canvasWidth = 0;
    maxColumns = 4;
    maxRows = 4;
    totalColumns = 0;
    totalRows = 0;
    _images: Image[] = [];
    _tiles: Tile[] = [];

    static AvailableColumns(startRow: number, startColumn: number, maxColumns: number, cells: boolean[][]): number {
        const totalColumns = cells[0].length;
        return Math.max(...positiveIntegerArray(maxColumns)
            .map(k => k <= maxColumns && startColumn + k <= totalColumns && cells[startRow] && cells[startRow][startColumn + k] ? k : 1));
    }

    static AvailableRows(startRow: number, startColumn: number, maxRows: number, cells: boolean[][]): number {
        const totalRows = cells[0].length;
        return Math.max(...positiveIntegerArray(maxRows)
            .map(k => k <= maxRows && startRow + k <= totalRows && cells[startRow + k] && cells[startRow + k][startColumn] ? k : 1));
    }

    static AvailableDimensions(
        dimensions: Dimensions[],
        startRow: number,
        startColumn: number,
        maxRows: number,
        maxColumns: number,
        cells: boolean[][]): Dimensions[] {
        const availableRows = Collage.AvailableRows(startRow, startColumn, maxRows, cells);
        const availableColumns = Collage.AvailableColumns(startRow, startColumn, maxColumns, cells);
        return dimensions.filter(x => x.rows <= availableRows && x.columns <= availableColumns);
    }

    static Build(images: Image[], canvasHeight, canvasWidth, totalRows = 0, totalColumns = 0, maxRows = 0, maxColumns = 0): Collage {
        const collage = Object.assign(new Collage(), {
            canvasHeight,
            canvasWidth,
            totalRows,
            totalColumns,
            maxRows,
            maxColumns
        });
        collage.images = images;
        return collage;
    }

    static BuildEmptyCells(rows: number, cols: number): boolean[][] {
        return integerArray(rows).map(x => integerArray(cols).map(y => true));
    }

    static BuildTiles(collage: Collage): Tile[] {
        return collage.images.map((image, index) => {
            const dimensions = Collage.FindDimensions(image.height, image.width, collage.tileDimensions, collage.cellHeight, collage.cellWidth);
            return Object.assign(new Tile(), {
                image,
                dimensions,
                id: index + 1,
                cellHeight: collage.cellHeight,
                cellWidth: collage.cellWidth
            });
        }
        );
    }

    static ChooseTileId(id: number, tileIds: number[]): number[] {
        return [...tileIds.filter(x => x !== id), id];
    }

    static FindCoordinates(index: number, totalRows: number, totalColumns: number): Coordinates {
        const remainder = (index + totalColumns) % totalColumns;
        return {
            row: (index - remainder) / totalColumns,
            column: remainder
        };
    }

    static FindCoordinatesNested(
        index: number, totalRows: number, totalColumns: number, startRow: number, startColumn: number): Coordinates {
        const coordinates = Collage.FindCoordinates(index, totalRows, totalColumns);
        coordinates.column += startColumn;
        coordinates.row += startRow;
        return coordinates;
    }

    static FindDimensions(height: number, width: number, dimensions: Dimensions[], cellHeight: number, cellWidth: number): Dimensions {
        const filtered = dimensions.filter(x => x.rows * cellHeight <= height && x.columns * cellWidth <= width);
        const ordered = filtered.sort((a, b) => Math.abs(height / width - a.ratio) - Math.abs(height / width - b.ratio));
        const closestMatch = ordered[0];
        const rows = closestMatch && closestMatch.rows ? closestMatch.rows : [];
        const columns = closestMatch && closestMatch.columns ? closestMatch.columns : [];
        return Object.assign(new Dimensions(), {
            rows,
            columns,
            height,
            width
        });
    }

    static FindNextTileId(tiles: Tile[], tileIds: number[], dimensions: Dimensions): number {
        const nextMatch = Collage.FindNextMatchId(tiles, tileIds, dimensions);
        return nextMatch || Collage.FindBestMatchId(tiles, tileIds, dimensions);
    }

    static FindBestMatchId(tiles: Tile[], tileIds: number[], dimensions: Dimensions): number {
        let diff = 999;
        return tileIds.reduce((acc, id) => {
            const tile = tiles.find(x => x.id === id);
            diff = Math.abs(tile.ratio - dimensions.ratio);
            return acc === 0 || diff < acc ? id : acc;
        }, 0);
    }

    static FindNextMatchId(tiles: Tile[], tileIds: number[], dimensions: Dimensions): number {
        return tileIds.reduce((acc, id) => {
            if (acc !== 0) {
                return acc;
            }
            const tile = tiles.find(x => x.id === id);
            return tile && tile.rows === dimensions.rows && tile.columns === dimensions.columns ? tile.id : 0;
        }, 0);
    }

    static FindBestMatch(tiles: Tile[], tileIds: number[], dimensions: Dimensions): Tile {
        const id = Collage.FindBestMatchId(tiles, tileIds, dimensions);
        return tiles.find(x => x.id === id);
    }

    static FindNextTile(tiles: Tile[], tileIds: number[], dimensions: Dimensions[]): Tile {
        return tileIds.reduce((acc, id) => {
            if (acc === null || acc.id === 0) {
                const tile = tiles.find(x => x.id === id);
                const dim = dimensions.find(x => tile.rows === x.rows && tile.columns === x.columns);
                return dim ? Object.assign(new Tile(), tile, {
                    dimensions: Object.assign(new Dimensions(), tile.dimensions, {
                        rows: dim.rows,
                        columns: dim.columns
                    })
                }) : null;
            }
            return acc;
        }, new Tile()) || Collage.FindBestMatch(tiles, tileIds, dimensions[0]);
    }

    static GetTileDimensions(cellHeight: number, cellWidth: number, maxRows: number, maxColumns: number): Dimensions[] {
        return positiveIntegerArray(maxRows).reduce((acc, x) => {
            const dimensions = positiveIntegerArray(maxColumns)
                .map(y => Object.assign(new Dimensions(), {
                    rows: x,
                    columns: y,
                    height: x * cellHeight,
                    width: y * cellWidth
                }));
            return [...acc, ...dimensions];
        }, []);
    }

    static MarkCellsAsFilled(cells: boolean[][], startIndex: number, dimensions: Dimensions, totalRows: number, totalColumns: number): boolean[][] {
        const start = Collage.FindCoordinates(startIndex, totalRows, totalColumns);
        return integerArray(dimensions.rows * dimensions.columns).reduce((acc, i) => {
            const coordinates = Collage.FindCoordinatesNested(i, dimensions.rows, dimensions.columns, start.row, start.column);
            cells[coordinates.row][coordinates.column] = false;
            return cells;
        }, cells);
    }

    static PositionTiles(tiles: Tile[], collage: Collage): Tile[] {
        let cells = Collage.BuildEmptyCells(collage.totalRows, collage.totalColumns);
        let tileIds = tiles.map(x => x.id);

        return integerArray(collage.totalCells).reduce((acc, i) => {
            const coordinates = Collage.FindCoordinates(i, collage.totalRows, collage.totalColumns);
            if (!cells[coordinates.row][coordinates.column]) {
                return acc;
            }
            const availableDimensions = Collage.AvailableDimensions(collage.tileDimensions, coordinates.row, coordinates.column, collage.maxRows, collage.maxColumns, cells);
            const tile = Collage.FindNextTile(tiles, tileIds, availableDimensions);
            tile.coordinates = coordinates;
            cells = Collage.MarkCellsAsFilled(cells, i, tile.dimensions, collage.totalRows, collage.totalColumns);
            tileIds = Collage.ChooseTileId(tile.id, tileIds);
            return [...acc, tile];
        }, []);
    }

    get cellHeight(): number {
        return this.canvasHeight / this.totalRows;
    }

    get cellWidth(): number {
        return this.canvasWidth / this.totalColumns;
    }

    get emptyCells(): boolean[][] {
        return Collage.BuildEmptyCells(this.totalRows, this.totalColumns);
    }

    get images(): Image[] {
        return this._images;
    }

    set images(value: Image[]) {
        console.dir(value);
        this._images = value;
        this.tiles = Collage.BuildTiles(this);
    }

    get tileDimensions(): Dimensions[] {
        return Collage.GetTileDimensions(this.cellHeight, this.cellWidth, this.maxRows, this.maxColumns);
    }

    get tiles(): Tile[] {
        console.log(this._tiles.reduce((acc, x) => {
            return acc[x.id] ? Object.assign(acc, { [x.id]: acc[x.id] + 1 }) : Object.assign(acc, { [x.id]: 1 });
        }, {}));
        return this._tiles;
    }

    set tiles(value: Tile[]) {
        console.dir(value);
        this._tiles = Collage.PositionTiles(value, this);
    }

    get totalCells(): number {
        return this.totalRows * this.totalColumns;
    }

}
