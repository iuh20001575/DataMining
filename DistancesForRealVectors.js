function DistancesForRealVectors(...points) {
    const l1 = [],
        l2 = [],
        lInf = [];

    for (let i = 0; i < points.length; i++) {
        let temp1 = [];
        let temp2 = [];
        let tempInf = [];
        for (let j = 0; j < i + 1; j++) {
            temp1.push(
                (
                    Math.abs(points[i][0] - points[j][0]) +
                    Math.abs(points[i][1] - points[j][1])
                ).toFixed(2),
            );
            temp2.push(
                Math.sqrt(
                    Math.pow(points[i][0] - points[j][0], 2) +
                        Math.pow(points[i][1] - points[j][1], 2),
                ).toFixed(2),
            );
            tempInf.push(
                Math.max(
                    Math.abs(points[i][0] - points[j][0]),
                    Math.abs(points[i][1] - points[j][1]),
                ).toFixed(2),
            );
        }
        l1.push(temp1);
        l2.push(temp2);
        lInf.push(tempInf);
    }

    console.log('🚀 ~ DistancesForRealVectors ~ L1:');
    for (let i = 0; i < points.length; i++) {
        console.log(l1[i].join(' '));
    }

    console.log('\n🚀 ~ DistancesForRealVectors ~ L2:');
    for (let i = 0; i < points.length; i++) {
        console.log(l2[i].join(' '));
    }

    console.log('\n🚀 ~ DistancesForRealVectors ~ LInf:');
    for (let i = 0; i < points.length; i++) {
        console.log(lInf[i].join(' '));
    }
}

const dataSet = new Array(5)
    .fill(null)
    .map(() => [
        Math.round(Math.random() * 20),
        Math.round(Math.random() * 20),
    ]);

console.log('🚀 ~ dataSet:', dataSet);

DistancesForRealVectors(...dataSet);
