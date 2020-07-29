const DistanceMeasure = () => {
    let ser1 = [ 9, 93, 15, 19, 24 ];
    let ser2 = [ 31, 97, 81, 82, 39,41];
    let distFunc = function( a, b ) {
        return Math.abs( a - b );
    };
    var dtw = new DynamicTimeWarping(ser1, ser2, distFunc);
    // var dist = dtw.getDistance();
    // console.log(dist)
    var path = dtw.getPath();
    console.log(path)

}

function DynamicTimeWarping ( ts1, ts2, distanceFunction ) {
    var ser1 = ts1;
    var ser2 = ts2;
    var distFunc = distanceFunction;
    var distance;
    var matrix;
    var path;

    var getDistance = function () {
        if (distance !== undefined) {
            return distance;
        }
        matrix = [];
        for (var i = 0; i < ser1.length; i++) {
            matrix[i] = [];
            for (var j = 0; j < ser2.length; j++) {
                var cost = Infinity;
                if (i > 0) {
                    cost = Math.min(cost, matrix[i - 1][j]);
                    if (j > 0) {
                        cost = Math.min(cost, matrix[i - 1][j - 1]);
                        cost = Math.min(cost, matrix[i][j - 1]);
                    }
                } else {
                    if (j > 0) {
                        cost = Math.min(cost, matrix[i][j - 1]);
                    } else {
                        cost = 0;
                    }
                }
                matrix[i][j] = cost + distFunc(ser1[i], ser2[j]);
            }
        }

        return matrix[ser1.length - 1][ser2.length - 1];
    };
    this.getDistance = getDistance;

    var getPath = function() {
        if ( path !== undefined ) {
            return path;
        }
        if ( matrix === undefined ) {
            getDistance();
        }
        var i = ser1.length - 1;
        var j = ser2.length - 1;
        path = [ [ i, j ] ];
        while ( i > 0 || j > 0 ) {
            if ( i > 0 ) {
                if ( j > 0 ) {
                    if ( matrix[ i - 1 ][ j ] < matrix[ i - 1 ][ j - 1 ] ) {
                        if ( matrix[ i - 1 ][ j ] < matrix[ i ][ j - 1 ] ) {
                            path.push( [ i - 1, j ] );
                            i--;
                        } else {
                            path.push( [ i, j - 1 ] );
                            j--;
                        }
                    } else {
                        if ( matrix[ i - 1 ][ j - 1 ] < matrix[ i ][ j - 1 ] ) {
                            path.push( [ i - 1, j - 1 ] );
                            i--;
                            j--;
                        } else {
                            path.push( [ i, j - 1 ] );
                            j--;
                        }
                    }
                } else {
                    path.push( [ i - 1, j ] );
                    i--;
                }
            } else {
                path.push( [ i, j - 1 ] );
                j--;
            }
        }
        path = path.reverse();

        return path;
    };

    this.getPath = getPath;

}
export default DistanceMeasure;
