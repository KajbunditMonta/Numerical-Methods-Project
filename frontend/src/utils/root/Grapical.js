import * as math from "mathjs";

function GrapicalUtils (xStart ,xEnd, Error, fx) {

    const fxc = math.compile(fx);
    const result = [];
    let iter = 0;
    const fe = fxc.evaluate( {x : xEnd} );

    while (xStart < xEnd) {

        const fc = fxc.evaluate( {x : xStart} );
        const fc1 = fxc.evaluate( {x : xStart + 1} );

        result.push({ 
            iter : iter++,
            x : format(xStart),
            y : format(fc),
            error : format(math.abs( fc * 100 )) + "%"
        });

        if (fc === 0) {
            return result;
        }

        if (fc * fe < 0) {

            if (fc > fc1 && fc > 0) {
                xStart++;
            }
            if (fc < fc1 && fc < 0) {
                xStart++;
            }

        }

        else {
            break;
        }

    }

    if (xStart > xEnd) {
        return 'Error404';
    }

    const fc = fxc.evaluate( {x : xStart} );
    result.push({ 
        iter : iter++,
        x : format(xStart),
        y : format(fc),
        error : format(math.abs( fc * 100 )) + "%"
    });

    xStart--;
    let eps;
    do {

        xStart += Error;
        eps = fxc.evaluate( {x : xStart} );

        result.push({ 
            iter : iter++,
            x : format(xStart),
            y : format(eps),
            error : format(math.abs(eps * 100)) + "%"
        });

    }
    while (math.abs(eps) >= 0.0001 && eps < fe);

    return result;

}

function format (num) {
    if (Number.isInteger(num)) {
        return num.toFixed(0);
    }
    else {
        return num.toFixed(6);
    }
}

export default GrapicalUtils;