export function getBordersForGrid(
    index: number,
    cols: number,
    total: number,
): {
    leftBorder: boolean;
    rightBorder: boolean;
    topBorder: boolean;
    bottomBorder: boolean;
} {
    if (cols <= 0) {
        return {
            leftBorder: true,
            rightBorder: true,
            topBorder: true,
            bottomBorder: true,
        };
    }
    const row = Math.floor(index / cols);
    const col = index % cols;
    return {
        leftBorder: col === 0,
        rightBorder: true,
        topBorder: row === 0,
        bottomBorder: true,
    };
}
