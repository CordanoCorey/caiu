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
     * Find how many columns are available to the right of the active cell.
     * @param startRow 
     * @param startColumn 
     * @param maxColumns 
     * @param cells 
     */
    static AvailableColumns(startRow: number, startColumn: number, maxColumns: number, cells: boolean[][]): number {
        const totalColumns = cells[0].length;
        return Math.max(...positiveIntegerArray(maxColumns)
            .map(k => k <= maxColumns && startColumn + k <= totalColumns && cells[startRow] && cells[startRow][startColumn + k] ? k : 1));
    }

    /**
     * Find how many rows are available below the active cell.
     * @param startRow 
     * @param startColumn 
     * @param maxRows 
     * @param cells 
     */
    static AvailableRows(startRow: number, startColumn: number, maxRows: number, cells: boolean[][]): number {
        const totalRows = cells[0].length;
        return Math.max(...positiveIntegerArray(maxRows)
            .map(k => k <= maxRows && startRow + k <= totalRows && cells[startRow + k] && cells[startRow + k][startColumn] ? k : 1));
    }

    /**
     * Find subset of available dimensions by examining if cells yet to be traversed in sequence are empty.
     * @param dimensions 
     * @param startRow 
     * @param startColumn 
     * @param maxRows 
     * @param maxColumns 
     * @param cells 
     */
    static AvailableDimensions(dimensions: Dimensions[], startRow: number, startColumn: number, maxRows: number, maxColumns: number, cells: boolean[][]): Dimensions[] {
        const availableRows = Collage.AvailableRows(startRow, startColumn, maxRows, cells);
        const availableColumns = Collage.AvailableColumns(startRow, startColumn, maxColumns, cells);
        return dimensions.filter(x => x.rows <= availableRows && x.columns <= availableColumns);
    }

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
        console.log('\nTile Dimensions');
        console.dir(tileDimensions);
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
     * Initialize matrix of cells, each set to true.
     * '/
     * @param rows total # of rows
     * @param cols Total # of columns
     */
    static BuildEmptyCells(rows: number, cols: number): number[][] {
        return integerArray(rows).map(x => integerArray(cols).map(y => 0));
    }

    /**
     * Map images to tiles after constructing a new collage.
     * @param collage 
     */
    static BuildTiles(collage: Collage): Tile[] {
        return collage.images.map((image, index) => {
            const dimensions = Collage.FindDimensions(image.height, image.width, collage.tileDimensions, collage.cellHeight, collage.cellWidth);
            console.log('\nDimensions for Image:\t', image.src);
            console.dir(dimensions);
            return build(Tile, {
                image,
                dimensions,
                id: index + 1,
                cellHeight: collage.cellHeight,
                cellWidth: collage.cellWidth
            });
        });
    }

    /**
     * Move selected tile ID to last priority for subsequent selection.
     * @param id 
     * @param tileIds 
     */
    static ChooseTileId(id: number, tileIds: number[]): number[] {
        const t = [...tileIds.filter(x => x !== id), id];
        console.log('\nTile ID chosen = ', id);
        console.dir(t);
        return t;
    }

    /**
     * Find the x-y coordinates for a number in sequence.
     * @param index 
     * @param totalRows 
     * @param totalColumns 
     */
    static FindCoordinates(index: number, totalRows: number, totalColumns: number): Coordinates {
        const remainder = (index + totalColumns) % totalColumns;
        return {
            row: (index - remainder) / totalColumns,
            column: remainder
        };
    }

    /**
     * Find the x-y coordinates for a number in sequence given a starting position.
     * @param index 
     * @param totalRows 
     * @param totalColumns 
     * @param startRow 
     * @param startColumn 
     */
    static FindCoordinatesNested(index: number, totalRows: number, totalColumns: number, startRow: number, startColumn: number): Coordinates {
        const coordinates = Collage.FindCoordinates(index, totalRows, totalColumns);
        coordinates.column += startColumn;
        coordinates.row += startRow;
        return coordinates;
    }

    /**
     * Find optimal (best fit) dimensions for a single tile in the collage.
     * @param height 
     * @param width 
     * @param dimensions 
     * @param cellHeight 
     * @param cellWidth 
     */
    static FindDimensions(height: number, width: number, dimensions: Dimensions[], cellHeight: number, cellWidth: number): Dimensions {
        const filtered = dimensions.filter(x => x.rows * cellHeight <= height && x.columns * cellWidth <= width);
        const ordered = filtered.sort((a, b) => Math.abs(height / width - a.ratio) - Math.abs(height / width - b.ratio));
        const closestMatch = ordered[0];
        const rows = closestMatch && closestMatch.rows ? closestMatch.rows : [];
        const columns = closestMatch && closestMatch.columns ? closestMatch.columns : [];
        return build(Dimensions, {
            rows,
            columns,
            height,
            width
        });
    }

    /**
     * Find tile with dimensions equal to given dimensions.
     * @param tiles 
     * @param tileIds 
     * @param dimensions 
     */
    static FindNextTileId(tiles: Tile[], tileIds: number[], dimensions: Dimensions): number {
        const nextMatch = Collage.FindNextMatchId(tiles, tileIds, dimensions);
        return nextMatch || Collage.FindBestMatchId(tiles, tileIds, dimensions);
    }

    /**
     * Find the ID of the tile with ratio closest to ratio for given dimensions.
     * @param tiles 
     * @param tileIds 
     * @param dimensions 
     */
    static FindBestMatchId(tiles: Tile[], tileIds: number[], dimensions: Dimensions): number {
        let diff = 999;
        return tileIds.reduce((acc, id) => {
            const tile = tiles.find(x => x.id === id);
            diff = Math.abs(tile.ratio - dimensions.ratio);
            return acc === 0 || diff < acc ? id : acc;
        }, 0);
    }

    /**
     * Find the ID of the tile with dimensions equal to given dimensions.
     * @param tiles 
     * @param tileIds 
     * @param dimensions 
     */
    static FindNextMatchId(tiles: Tile[], tileIds: number[], dimensions: Dimensions): number {
        return tileIds.reduce((acc, id) => {
            if (acc !== 0) {
                return acc; // match already found
            }
            const tile = tiles.find(x => x.id === id);
            return tile && tile.rows === dimensions.rows && tile.columns === dimensions.columns ? tile.id : 0;
        }, 0);
    }

    /**
     * Find tile with ratio closest to ratio for given dimensions.
     * @param tiles 
     * @param tiles 
     * @param tileIds 
     * @param dimensions 
     */
    static FindBestMatch(tiles: Tile[], tileIds: number[], dimensions: Dimensions): Tile {
        const id = Collage.FindBestMatchId(tiles, tileIds, dimensions);
        return tiles.find(x => x.id === id);
    }

    /**
     * Find the tile to position next in sequence, and assign # rows and # columns to its dimensions.
     * @param tiles 
     * @param tileIds 
     * @param dimensions 
     */
    static FindNextTile(tiles: Tile[], tileIds: number[], dimensions: Dimensions[]): Tile {
        return tileIds.reduce((acc, id) => {
            if (acc === null || acc.id === 0) {
                const tile = tiles.find(x => x.id === id);
                const dim = dimensions.find(x => tile.rows === x.rows && tile.columns === x.columns);
                return dim ? build(Tile, tile, {
                    dimensions: build(Dimensions, tile.dimensions, {
                        rows: dim.rows,
                        columns: dim.columns
                    })
                }) : null;
            }
            return acc;
        }, new Tile()) || Collage.FindBestMatch(tiles, tileIds, dimensions[0]);
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

    /**
     * Assign false to cells that have been filled by positioning tile.
     * @param cells 
     * @param startIndex 
     * @param dimensions 
     * @param totalRows 
     * @param totalColumns 
     */
    static MarkCellsAsFilled(cells: boolean[][], startIndex: number, dimensions: Dimensions, totalRows: number, totalColumns: number): boolean[][] {
        const start = Collage.FindCoordinates(startIndex, totalRows, totalColumns);
        return integerArray(dimensions.rows * dimensions.columns).reduce((acc, i) => {
            const coordinates = Collage.FindCoordinatesNested(i, dimensions.rows, dimensions.columns, start.row, start.column);
            if (cells && cells[coordinates.row] && cells[coordinates.row][coordinates.column]) {
                cells[coordinates.row][coordinates.column] = false;
            }
            return cells;
        }, cells);
    }

    /**
     * Iterate through each cell to position tiles such that all cells are covered.
     * @param tiles mapped 1-1 from images
     * @param collage new instance of collage
     */
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

    get cells(): number[][] {
        return this._cells || this.emptyCells;
    }

    get emptyCells(): number[][] {
        return Collage.BuildEmptyCells(this.totalRows, this.totalColumns);
    }

    get images(): Image[] {
        return this._images;
    }

    set images(value: Image[]) {
        this._images = value.map(img => Image.BuildForTile(img, this.tileDimensions));
        // this.tiles = Collage.BuildTiles(this);
        console.log('\nTiles');
        console.dir(this.tiles);
    }

    get tiles(): Tile[] {
        return integerArray(this.totalCells)
            .reduce((acc, i) => this.isCellFilled(i) ? acc : [...acc, this.fillCell(i)], []);
    }

    get totalCells(): number {
        return this.totalRows * this.totalColumns;
    }

    private fillCell(index: number): Tile {
        const coordinates = this.findCoordinates(index);
        const dim = this.findAvailableDimensions(coordinates.row, coordinates.column);
        return this.images.reduce((acc, image) => {
            if (acc) {
                return <Tile>acc;
            }
            const dimensions = this.findImageDimensions(image, dim);
            return dimensions ? build(Tile, {
                image,
                dimensions,
            }) : null;
        }, null);
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

    private isCellFilled(index: number): boolean {
        const coordinates = this.findCoordinates(index);
        return this.cells[coordinates.row][coordinates.column] !== 0;
    }

    private markCellsFilled(index: number, tileId: number) {
        const coordinates = this.findCoordinates(index);
        this.cells[coordinates.row][coordinates.column] = tileId;
    }

    private reorderImages() {

    }

}
