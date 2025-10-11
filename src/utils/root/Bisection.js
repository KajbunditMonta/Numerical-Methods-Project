import * as math from 'mathjs'

function BisectionUtils (Xstart , Xend, Error, fx) {

    const fxc = math.compile(fx)
    const result = []

    let i = 0;
    let xl = Xstart
    let xr = Xend
    let fxl = fxc.evaluate( {x : xl} )
    let fxr = fxc.evaluate( {x : xr} )

    let xm = ( xl + xr ) / 2
    let fxm = fxc.evaluate( {x : xm} )
    let eps = Infinity

    if (fxl * fxr < 0) {

        result.push({
            iter : i++,
            x : format(xm),
            y : format(fxm),
            err : format(eps)
        })

        if (fxm * fxl < 0) {
            xr = xm
            fxr = fxm
        }
        else if (fxm * fxl > 0) {
            xl = xm
            fxl= fxm
        }

        while (eps > Error && fxm !== 0) {
            xm = ( xl + xr ) / 2
            fxm = fxc.evaluate( {x : xm} )
            
            if (fxm * fxl < 0) {
                eps = math.abs((xm - xr) / xm)
                xr = xm
                fxr = fxm
            }
            else if (fxm * fxl > 0) {
                eps = math.abs((xm - xl) / xm)
                xl = xm
                fxl= fxm
            }

            result.push({
                iter : i++,
                x : format(xm),
                y : format(fxm),
                err : format(eps)
            })

        }

    }

    else {
        return 0;
    }

    return result;

}

function format (num) {

    if (Number.isInteger(num)) {
        return num.toFixed(0)
    }
    else {
        return num.toFixed(6)
    }

}

export default BisectionUtils