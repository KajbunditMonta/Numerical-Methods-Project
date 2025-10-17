import * as math from 'mathjs';

function FalseUtils (Xstart , Xend, Error, fx) {

    const fxc = math.compile(fx)
    const result = []

    let i = 0
    let xl = Xstart
    let fxl = fxc.evaluate( {x : xl} )
    let xr = Xend
    let fxr = fxc.evaluate( {x : xr} )

    let x1 = ( ( xl * fxr ) - ( xr * fxl ) ) / ( fxr - fxl )
    let fx1 = fxc.evaluate( {x : x1} )
    let eps = Infinity

    if (fxl * fxr < 0) {

        result.push({
            iter : i++,
            x : format(x1),
            y : format(fx1),
            err : format(eps)
        })

        if (fx1 * fxr > 0) {
            xr = x1
            fxr = fx1
        }
        else if (fx1 * fxr < 0) {
            xl = x1
            fxl = fx1
        }

        while (eps > Error && x1 !== 0 && fx1 !== 0) {
            x1 = ( ( xl * fxr ) - ( xr * fxl ) ) / ( fxr - fxl )
            fx1 = fxc.evaluate( {x : x1} )

            if (fx1 * fxr > 0) {
                eps = math.abs((x1 - xr) / x1)
                xr = x1
                fxr = fx1
            }
            else if (fx1 * fxr < 0) {
                eps = math.abs((x1 - xl) / x1)
                xl = x1
                fxl = fx1
            }

            result.push({
                iter : i++,
                x : format(x1),
                y : format(fx1),
                err : format(eps)
            })

        }

    }

    else {
        return 0;
    }

    return result

}

function format (num) {

    if (Number.isInteger(num)) {
        return num.toFixed(0)
    }
    else {
        return num.toFixed(6)
    }
        
}

export default FalseUtils;