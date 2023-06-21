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
    
    // 将rlist中的数据显示于结果面板
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            // 若某一元素为无穷大
            if (rlist[i][j] == Infinity) {
                // 将内容设置为INF
                $("#r" + llist[i][j]).text("INF");
            } else {
                // 将内容设置为对应数字
                $("#r" + llist[i][j]).text(rlist[i][j]);
            }
        }
    }
}

// 双击文本框，将其内容变为无穷大
$("input").not("#randNum").dblclick(function () {
    $(this).val(Infinity);
    getMatrixData();
});

// 当下拉选择框内容发生变动时
$("select").change(function () {
    // 判断两个下拉选择框中的值是否一致，如果一致则弹出警告
    if ($("#from").val() == $("#to").val()) {
        alert("错误：需要计算的两点不能为同一点，将尝试随机取点！");
    } else {
        // 若不一致，则随机取点
        setRandomPoint();
    }
    // 设置全局变量from、to的值
    from = $("#from").val();
    to = $("#to").val();
});