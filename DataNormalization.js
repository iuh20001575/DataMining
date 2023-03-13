function minMaxNormalize(dataSet, min, max) {
    const normalizedDataSet = [];
    let minDataSet = dataSet[0],
        maxDataSet = dataSet[0];

    dataSet.forEach((i) => {
        if (i < minDataSet) minDataSet = i;
        if (i > maxDataSet) maxDataSet = i;
    });

    dataSet.forEach((i) =>
        normalizedDataSet.push(
            (
                ((i - minDataSet) * (max - min)) / (maxDataSet - minDataSet) +
                min
            ).toFixed(2),
        ),
    );

    return normalizedDataSet;
}

function zScoreNormalize(dataSet) {
    const normalizedDataSet = [];
    let mean = 0,
        std = 0;

    dataSet.forEach((i) => (mean += i));
    mean /= dataSet.length;

    dataSet.forEach((i) => (std += Math.pow(i - mean, 2)));
    std = Math.sqrt(std / (dataSet.length - 1));

    dataSet.forEach((i) =>
        normalizedDataSet.push(((i - mean) / std).toFixed(2)),
    );

    return normalizedDataSet;
}

function decimalScalingNormalize(dataSet) {
    const normalizedDataSet = [];
    let max = dataSet[0];

    dataSet.forEach((i) => {
        if (i > max) max = i;
    });

    let j = 0;
    while (max > 0) {
        j++;
        max /= 10;
        max = Number.parseInt(max);
    }

    dataSet.forEach((i) =>
        normalizedDataSet.push((i / Math.pow(10, j)).toFixed(2)),
    );

    return normalizedDataSet;
}

const dataSet = new Array(10)
    .fill(0)
    .map(() => Math.floor(Math.random() * 100));

console.log('🚀 ~ dataSet:', dataSet.join(', '));
console.log(
    '\n🚀 ~ minMaxNormalize(dataSet, 2, 3):',
    minMaxNormalize(dataSet, 2, 3).join(', '),
);
console.log(
    '\n🚀 ~ zScoreNormalize(dataSet):',
    zScoreNormalize(dataSet).join(', '),
);
console.log(
    '\n🚀 ~ decimalScalingNormalize(dataSet):',
    decimalScalingNormalize(dataSet).join(', '),
);
