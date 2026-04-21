export type GIMatrix = number[][];

export class GI_MatrixEngine {
  create(rows: number, cols: number, fill: number = 0): GIMatrix {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  identity(size: number): GIMatrix {
    const m = this.create(size, size, 0);
    for (let i = 0; i < size; i++) {
      m[i][i] = 1;
    }
    return m;
  }

  add(a: GIMatrix, b: GIMatrix): GIMatrix {
    const rows = a.length;
    const cols = a[0].length;
    const out = this.create(rows, cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out[r][c] = a[r][c] + b[r][c];
      }
    }

    return out;
  }

  subtract(a: GIMatrix, b: GIMatrix): GIMatrix {
    const rows = a.length;
    const cols = a[0].length;
    const out = this.create(rows, cols);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out[r][c] = a[r][c] - b[r][c];
      }
    }

    return out;
  }

  multiply(a: GIMatrix, b: GIMatrix): GIMatrix {
    const rowsA = a.length;
    const colsA = a[0].length;
    const rowsB = b.length;
    const colsB = b[0].length;

    if (colsA !== rowsB) {
      throw new Error("Matrix dimension mismatch");
    }

    const out = this.create(rowsA, colsB);

    for (let r = 0; r < rowsA; r++) {
      for (let c = 0; c < colsB; c++) {
        let sum = 0;
        for (let k = 0; k < colsA; k++) {
          sum += a[r][k] * b[k][c];
        }
        out[r][c] = sum;
      }
    }

    return out;
  }

  transpose(m: GIMatrix): GIMatrix {
    const rows = m.length;
    const cols = m[0].length;
    const out = this.create(cols, rows);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        out[c][r] = m[r][c];
      }
    }

    return out;
  }

  determinant(m: GIMatrix): number {
    const n = m.length;

    if (n === 1) return m[0][0];
    if (n === 2) return m[0][0] * m[1][1] - m[0][1] * m[1][0];

    let det = 0;

    for (let c = 0; c < n; c++) {
      const sub = this.minor(m, 0, c);
      det += ((c % 2 === 0 ? 1 : -1) * m[0][c] * this.determinant(sub));
    }

    return det;
  }

  minor(m: GIMatrix, row: number, col: number): GIMatrix {
    return m
      .filter((_, r) => r !== row)
      .map(r => r.filter((_, c) => c !== col));
  }

  inverse(m: GIMatrix): GIMatrix {
    const det = this.determinant(m);
    if (det === 0) throw new Error("Matrix is not invertible");

    const n = m.length;
    const adj = this.create(n, n);

    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const sub = this.minor(m, r, c);
        const sign = (r + c) % 2 === 0 ? 1 : -1;
        adj[c][r] = sign * this.determinant(sub);
      }
    }

    return adj.map(row => row.map(v => v / det));
  }
}

export function createGIMatrixEngine() {
  return new GI_MatrixEngine();
}

