// @ts-nocheck
// Utility function to fetch and parse Google Sheets CSV data
export async function fetchGoogleSheetsData(url) {
console.log("FETCHING SHEET")
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    let myCellContentArr = [];
    let finalProjObs = [];
    let starts = [];
    let ranges = [];

    let cells = data.feed.entry;
    let numRows = parseInt(data.feed.gs$rowCount.$t);
    let numCols = parseInt(data.feed.gs$colCount.$t);

    // Calculate row starts
    for (var i = 0; i < numRows; i++) {
      let range = numCols * i;
      starts.push(range);
    }

    // Calculate ranges for each row
    for (var i = 0; i < starts.length; i++) {
      let curStart = starts[i];
      let curRange = [];
      curRange[0] = curStart;
      curRange[1] = curStart + numCols;
      ranges.push(curRange);
    }

    // Extract content from each row
    for (var i = 0; i < ranges.length; i++) {
      let curRange = ranges[i];
      let projArray = cells.slice(curRange[0], curRange[1]);
      let contentArray = [];
      for (var j = 0; j < projArray.length; j++) {
        let curCell = projArray[j];
        let curContent = curCell.content.$t;
        contentArray.push(curContent);
      }
      myCellContentArr.push(contentArray);
    }

    // Get header names
    let headerCells = cells.filter(obj => {
      return obj.gs$cell.row === "1";
    });

    let headerNames = headerCells.map(a => a.content.$t);

    // Convert to object format
    for (var i = 1; i < myCellContentArr.length; i++) {
      let curRowArr = myCellContentArr[i];
      let projObj = {};
      for (var j = 0; j < curRowArr.length; j++) {
        let curHeaderKey = headerNames[j];
        let curCellContent = curRowArr[j];
        projObj[curHeaderKey] = curCellContent;
      }
      finalProjObs.push(projObj);
    }
    console.log(finalProjObs)
    return finalProjObs;
  } catch (error) {
    console.error('Error fetching Google Sheets data:', error);
    return [];
  }
}
