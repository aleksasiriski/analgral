async function drawGraph(N, A, B, F, Fdx, evenly = true) {
    try {
        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(A, B + 0.5, 0.5).toArray()
        const yValues = xValues.map(function (x) {
            return fOfX(x, F)
        })

        const subIntervals = partitionInterval(N, A, B, evenly)
        const points = choosePoints(subIntervals)

        const xValuesIntervals = generateIntervalsArray(subIntervals)
        const yValuesIntervals = xValuesIntervals.map(function (x) {
            return 0
        })

        const xValuesPoints = generatePointsArray(points)
        const yValuesPoints = xValuesPoints.map(function (x) {
            return 0
        })

        // render the plot using plotly
        const trace = {
            x: xValues,
            y: yValues,
            type: 'lines',
            fill: 'tonexty',
            name: 'F(x)',
            line: {
                color: 'rgb(213, 125, 61)'
            }
        }

        const traceIntervals = {
            x: xValuesIntervals,
            y: yValuesIntervals,
            type: 'lines',
            line: {
                color: 'rgb(61, 144, 213)'
            },
            name: 'Podintervali'
        }

        const tracePoints = {
            x: xValuesPoints,
            y: yValuesPoints,
            type: 'markers',
            marker: {
                color: 'rgb(219, 64, 82)',
                size: 12
            },
            line: {
                width: 0
            },
            name: 'Nasumični brojevi'
        }

        const data = [trace, traceIntervals, tracePoints]
        const riemannSum = calculateRiemannSum(points, F)
        const integral = calculateDefiniteIntegral(A, B, Fdx)
        const delta = Math.abs(riemannSum - integral)

        if (evenly) {
            Plotly.newPlot('plotEvenly', data)
            document.getElementById("riemannEvenly").innerHTML = "Rimanova suma: " + Math.round(riemannSum * 100000) / 100000;
            document.getElementById("deltaEvenly").innerHTML = "Greška Rimanove sume: " + Math.round(delta * 100000) / 100000;
        } else {
            Plotly.newPlot('plotRandomly', data)
            document.getElementById("riemannRandomly").innerHTML = "Rimanova suma: " + Math.round(riemannSum * 100000) / 100000;
            document.getElementById("deltaRandomly").innerHTML = "Greška Rimanove sume: " + Math.round(delta * 100000) / 100000;
        }
    }
    catch (err) {
        console.error(err)
        alert(err)
    }
}

async function calculateIntegral(A, B, Fdx) {
    const integral = calculateDefiniteIntegral(A, B, Fdx)
    document.getElementById("integral").innerHTML = "Integral funkcije: " + Math.round(integral * 100000) / 100000;
}

async function analyze() {
    const N = parseInt(document.getElementById('N').value)
    const A = parseInt(document.getElementById('A').value)
    const B = parseInt(document.getElementById('B').value)
    const functionString = document.getElementById('F').value
    const functionIntegralString = document.getElementById('Fintegral').value

    // compile the expression once
    const F = math.compile(functionString)
    const Fdx = math.compile(functionIntegralString)

    await calculateIntegral(A, B, Fdx)
    await drawGraph(N, A, B, F, Fdx, true)
    await drawGraph(N, A, B, F, Fdx, false)
}

const btn = document.querySelector('#analyze')
btn.addEventListener("click", analyze)