export function splitArray<T>(
    array: Array<T>,
    chunkSize: number,
    ) {
    const result = [];
    let i = 0;
    
    while (i < array.length) {
      result[i / chunkSize | 0] = array.slice(i, i + chunkSize);
      i += chunkSize;
    }
    
    return result;
  }