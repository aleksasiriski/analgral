function draw() {
    try {
        // compile the expression once
        const expression = document.getElementById('eq').value
        const N = document.getElementById('N').value
        const A = document.getElementById('A').value
        const B = document.getElementById('B').value
        const expr = math.compile(expression)

        // evaluate the expression repeatedly for different values of x
        const xValues = math.range(A - 2, B + 2, 0.5).toArray()
        const yValues = xValues.map(function (x) {
            return expr.evaluate({ x: x })
        })

        //const xValuesIntervals = calculate(N, A, B, expression)
        const xValuesIntervals = [2, 2.2, 3, 3.015, 4.5, 4.78, 5, 8.2, 8.666666, 10]
        const yValuesIntervals = xValuesIntervals.map(function (x) {
            return 0
        })

        //const xValuesPoints = calculate(N, A, B, expression)
        const xValuesPoints = [2, 2.2, 3, 3.015, 4.5, 4.78, 5, 8.2, 8.666666, 10]
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
            type: 'markers',
            marker: {
                color: 'rgb(61, 144, 213)',
                size: 6
            },
            line: {
                width: 0
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
    }
    catch (err) {
        console.error(err)
        alert(err)
    }
}

document.getElementById('form').onsubmit = function (event) {
    event.preventDefault()
    draw()
}