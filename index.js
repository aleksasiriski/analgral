function draw() {
    try {
        const N = parseInt(document.getElementById('N').value)
        const A = parseInt(document.getElementById('A').value)
        const B = parseInt(document.getElementById('B').value)
        const functionString = document.getElementById('F').value

        // compile the expression once
        const F = math.compile(functionString)

        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(A - 2, B + 2, 0.5).toArray()
        const yValues = xValues.map(function (x) {
            return fOfX(x, F)
        })

        const subIntervals = partitionInterval(N, A, B)
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
        Plotly.newPlot('plot', data)

        const riemannSum = calculateRiemannSum(points, F)
        const integral = calculateDefiniteIntegral(N, A, B, F)
        const delta = Math.abs(riemannSum - integral)
    }
    catch (err) {
        console.error(err)
        alert(err)
    }
}

const btn = document.querySelector('#analiziraj')
btn.addEventListener("click", draw)