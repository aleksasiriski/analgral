function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}

function fOfX(x, F) {
    return F.evaluate({ x: x })
}

function partitionInterval(N, A, B) {
    let nextInterval = [A, B]
    let subIntervals = []
    for (let i = 0; i < N; i++) {
        let newIntervalLimit = randomNumber(nextInterval[0], nextInterval[1])
        subIntervals.push([nextInterval[0], newIntervalLimit])
        nextInterval = [newIntervalLimit, nextInterval[1]]
    }
    return subIntervals
}

function choosePoints(subIntervals) {
    let points = []
    subIntervals.forEach((subInterval) => {
        let c = randomNumber(subInterval[0], subInterval[1])
        let delta = subInterval[1] - subInterval[0]
        points.push([c, delta])
    })
    return points
}

function generateIntervalsArray(subIntervals) {
    let combined = []
    subIntervals.forEach((subInterval) => {
        combined.push(subInterval[0])
        combined.push(subInterval[1])
    })
    let unique = combined.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    }).sort()
    return unique
}

function generatePointsArray(points) {
    let combined = []
    points.forEach((point) => {
        combined.push(point[0])
    })
    let unique = combined.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
    }).sort()
    return unique
}

function calculateRiemannSum(points, F) {
    let sum = 0
    points.forEach((point) => {
        sum += fOfX(point[0], F) * point[1]
    })
    return sum
}

function calculateDefiniteIntegral(N, A, B, F) {
    let i, z, h, s
    N = N + N
    s = fOfX(A, F) * fOfX(B, F)
    h = (B - A) / N
    z = 4
    for (i = 1; i < N; i += 1) {
       s = s + z * fOfX(A + i * h, F)
       z = 6 - z
    }
    return (s * h) / 3
}

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