/* 
defaultNum：默认填充数字
*/

// 默认填充无穷大
var defaultNum = Infinity;

// 结果计算函数
function calculate() {
    // 初始化
    /* for(let i = 0; i < length; i++){
        nlist[i] = []
        for(let j = 0; j < length; j++){
            if( i === j ){
                nlist[i][j] = 0
            }else{
                nlist[i][j] = graph[i][j]
            }
        }
    } */

    rlist = nlist;
    // 核心操作 判断K是否是i到j可能的中点
    for (let k = 0; k < getMatrixSize(); k++) {
        for (let i = 0; i < getMatrixSize(); i++) {
            for (let j = 0; j < getMatrixSize(); j++) {
                if (rlist[i][k] + rlist[k][j] < rlist[i][j]) {
                    rlist[i][j] = rlist[i][k] + rlist[k][j];
                }
            }
        }
    }
    showResult();
}
