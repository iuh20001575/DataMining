function Apriori(dataSet, minSupport) {
    var C1 = createC1(dataSet);
    var D = createD(dataSet);
    var L1 = createL1(C1, D, minSupport);
    var L = [L1];
    var k = 2;
    while (L[k - 2].length > 0) {
        var Ck = createCk(L[k - 2], k);
        var Lk = createLk(Ck, D, minSupport);
        L.push(Lk);
        k++;
    }
    return L;
}

// Path: Apriori.js
function createC1(dataSet) {
    var C1 = [];
    for (var i = 0; i < dataSet.length; i++) {
        for (var j = 0; j < dataSet[i].length; j++) {
            var item = dataSet[i][j];
            if (!contains(C1, item)) {
                C1.push(item);
            }
        }
    }
    C1.sort();
    return C1.map(function (value) {
        return [value];
    });
}

// Path: Apriori.js
function createD(dataSet) {
    return dataSet.map(function (t) {
        return t.sort();
    });
}

// Path: Apriori.js
function createL1(C1, D, minSupport) {
    var L1 = [];
    var supportData = {};
    for (var i = 0; i < D.length; i++) {
        for (var j = 0; j < C1.length; j++) {
            if (contains(D[i], C1[j][0])) {
                if (C1[j] in supportData) {
                    supportData[C1[j]]++;
                } else {
                    supportData[C1[j]] = 1;
                }
            }
        }
    }
    for (var key in supportData) {
        if (supportData[key] >= minSupport) {
            L1.push(key);
        }
    }
    return L1;
}

// Path: Apriori.js
function createCk(Lk, k) {}

// Path: Apriori.js
function createLk(Ck, D, minSupport) {
    var Lk = [];
    var supportData = {};
    for (var i = 0; i < D.length; i++) {
        for (var j = 0; j < Ck.length; j++) {
            if (containsAll(D[i], Ck[j])) {
                if (Ck[j] in supportData) {
                    supportData[Ck[j]]++;
                } else {
                    supportData[Ck[j]] = 1;
                }
            }
        }
    }
    for (var key in supportData) {
        if (supportData[key] >= minSupport) {
            Lk.push(key);
        }
    }
    return Lk;
}

// Path: Apriori.js
function contains(arr, item) {
    if (arr.indexOf) {
        return arr.indexOf(item) != -1;
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            return true;
        }
    }
    return false;
}

// Path: Apriori.js
function containsAll(arr, items) {
    for (var i = 0; i < items.length; i++) {
        if (!contains(arr, items[i])) {
            return false;
        }
    }
    return true;
}

// Path: Apriori.js
function union(arr1, arr2) {
    var result = arr1.concat(arr2);
    result.sort();
    return result;
}

// Path: Apriori.js
function generateRules(L, supportData, minConf) {
    var bigRuleList = [];
    for (var i = 1; i < L.length; i++) {
        for (var j = 0; j < L[i].length; j++) {
            var H1 = [L[i][j]];
            if (i > 1) {
                rulesFromConseq(L[i][j], H1, supportData, bigRuleList, minConf);
            } else {
                calcConf(L[i][j], H1, supportData, bigRuleList, minConf);
            }
        }
    }
    return bigRuleList;
}

// Path: Apriori.js
function rulesFromConseq(itemSet, H, supportData, bigRuleList, minConf) {
    var m = H[0].length;
    if (itemSet.length > m + 1) {
        var Hmp1 = createCk(H, m + 1);
        Hmp1 = calcConf(itemSet, Hmp1, supportData, bigRuleList, minConf);
        if (Hmp1.length > 1) {
            rulesFromConseq(itemSet, Hmp1, supportData, bigRuleList, minConf);
        }
    }
}

// Path: Apriori.js
function calcConf(itemSet, H, supportData, bigRuleList, minConf) {
    var prunedH = [];
    for (var i = 0; i < H.length; i++) {
        var conf = supportData[itemSet] / supportData[itemSet - H[i]];
        if (conf >= minConf) {
            console.log(itemSet - H[i] + ' -> ' + H[i] + ' conf: ' + conf);
            bigRuleList.push({
                antecedent: itemSet - H[i],
                consequent: H[i],
                confidence: conf,
            });
            prunedH.push(H[i]);
        }
    }
    return prunedH;
}

// Path: Apriori.js
function printRules(ruleList) {
    for (var i = 0; i < ruleList.length; i++) {
        var rule = ruleList[i];
        console.log(
            rule.antecedent +
                ' -> ' +
                rule.consequent +
                ' conf: ' +
                rule.confidence,
        );
    }
}

// Path: Apriori.js
function printL(L) {
    for (var i = 0; i < L.length; i++) {
        console.log('frequent ' + (i + 1) + '-itemsets\t\tsupport');
        console.log(L[i]);
        console.log();
    }
}

// Path: Apriori.js
function printSupportData(supportData) {
    console.log('elements\t\tsupport');
    for (var key in supportData) {
        console.log(key + '\t\t' + supportData[key]);
    }
}

// Path: Apriori.js
function printDataSet(D) {
    console.log('DataSet');
    console.log(D);
    console.log();
}

// Path: Apriori.js
function printC1(C1) {
    console.log('C1');
    console.log(C1);
    console.log();
}

// Path: Apriori.js
function printL1(L1) {
    console.log('L1');
    console.log(L1);
    console.log();
}

// Path: Apriori.js
function printCk(Ck) {
    console.log('Ck');
    console.log(Ck);
    console.log();
}

// Path: Apriori.js
function printLk(Lk) {
    console.log('Lk');
    console.log(Lk);
    console.log();
}

// Path: Apriori.js
function printRules(ruleList) {
    console.log('Rules');
    for (var i = 0; i < ruleList.length; i++) {
        var rule = ruleList[i];
        console.log(
            rule.antecedent +
                ' -> ' +
                rule.consequent +
                ' conf: ' +
                rule.confidence,
        );
    }
    console.log();
}

// Path: Apriori.js
function printApriori(L, supportData, ruleList) {
    printL(L);
    printSupportData(supportData);
    printRules(ruleList);
}

// Path: Apriori.js
function Apriori(D, minSupport, minConf) {
    var C1 = createC1(D);
    var L1 = createLk(C1, D, minSupport);
    var L = [L1];
    var k = 2;
    while (L[k - 2].length > 0) {
        var Ck = createCk(L[k - 2], k);
        var Lk = createLk(Ck, D, minSupport);
        L.push(Lk);
        k++;
    }
    var supportData = {};
    for (var i = 0; i < L.length; i++) {
        for (var j = 0; j < L[i].length; j++) {
            supportData[L[i][j]] = supportData[L[i][j]] || 0;
            supportData[L[i][j]]++;
        }
    }
    var ruleList = generateRules(L, supportData, minConf);
    return {
        L: L,
        supportData: supportData,
        ruleList: ruleList,
    };
}

// Path: Apriori.js
function testApriori() {
    var D = [
        [1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7],
        [1, 2, 5, 8],
        [1, 4, 6, 9, 10],
        [2, 4, 5, 11],
    ];
    var minSupport = 2;
    var minConf = 0.7;
    var result = Apriori(D, minSupport, minConf);
    printApriori(result.L, result.supportData, result.ruleList);
}

// Path: Apriori.js
testApriori();
