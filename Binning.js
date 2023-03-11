function equalWidth(data, numBins) {
    var min = data[0];
    var max = data[0];

    data.forEach((i) => {
        if (i < min) min = i;
        if (i > max) max = i;
    });

    var binWidth = Math.floor((max - min) / numBins);
    var bins = new Array(numBins)
        .fill(null)
        .map((i, index) => index)
        .map(function (i) {
            return {
                x0: min + i * binWidth,
                x1: min + (i + 1) * binWidth,
                item: [],
            };
        });
    data.forEach((item) => {
        bins.forEach((bin) => {
            if (item >= bin.x0 && item <= bin.x1) {
                bin.item.push(item);
            }
        });
    });

    console.log('Equal-Width');
    bins.forEach((bin, index) =>
        console.log(
            `Bin ${index + 1}: [${bin.x0}, ${bin.x1}]: ${bin.item.join(', ')}`,
        ),
    );

    console.log('\nSmoothing by median');
    bins.forEach((bin, index) => {
        let length = bin.item.length;
        let median;

        if (length % 2 === 0) {
            median = [bin.item[length / 2 - 1] + bin.item[length / 2]] / 2;
        } else {
            median = bin.item[Math.floor(length / 2)];
        }
        console.log(
            `Bin ${index + 1}: [${bin.x0}, ${bin.x1}]: ${bin.item
                .map(() => median)
                .join(', ')}`,
        );
    });

    console.log('\nSmoothing by boundaries');
    bins.forEach((bin, index) => {
        let length = bin.item.length;
        let avg = (bin.item[0] + bin.item[length - 1]) / 2;
        console.log(
            `Bin ${index + 1}: ${bin.item
                .map((item) =>
                    item <= avg ? bin.item[0] : bin.item[length - 1],
                )
                .join(', ')}`,
        );
    });
}

function equalDepth(data, numBins) {
    var sortedData = data.sort((a, b) => a - b);
    var binSize = Math.floor(sortedData.length / numBins);
    var bins = [];

    let a = [];
    data.forEach((i, index) => {
        a.push(i);
        if (index === sortedData.length - 1) {
            bins.push(a);
        } else if (a.length > binSize) {
            bins.push(a);
            a = [];
        }
    });

    console.log('\nEqual-Width');
    bins.forEach((bin, index) =>
        console.log(`Bin ${index + 1}: ${bin.join(', ')}`),
    );

    console.log('\nSmoothing by median');
    bins.forEach((bin, index) => {
        let length = bin.length;
        let median;

        if (length % 2 === 0) {
            median = [bin[length / 2 - 1] + bin[length / 2]] / 2;
        } else {
            median = bin[Math.floor(length / 2)];
        }
        console.log(`Bin ${index + 1}: ${bin.map(() => median).join(', ')}`);
    });

    console.log('\nSmoothing by boundaries');
    bins.forEach((bin, index) => {
        let length = bin.length;
        let avg = (bin[0] + bin[length - 1]) / 2;
        console.log(
            `Bin ${index + 1}: ${bin
                .map((item) => (item <= avg ? bin[0] : bin[length - 1]))
                .join(', ')}`,
        );
    });
}

const dataSet = new Array(20)
    .fill(null)
    .map(() => Math.floor(Math.random() * 100))
    .sort((a, b) => a - b);
const bin = Math.floor(Math.random() * 2) + 3;

console.log('🚀 ~ dataSet:', dataSet.join(', '));
console.log('🚀 ~ bin:', bin);
console.log('\n\n');

equalWidth(dataSet, bin);
equalDepth(dataSet, bin);
