/* 
clist:前十个字母列表
llist：前十个字母排列组合后的列表
nlist：获取单元格内所有数据组合而成的二维数组
rlist：计算结果二维数组
from：起点

*/
var clist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var llist = [[], [], [], [], [], [], [], [], [], []];
var nlist = [[], [], [], [], [], [], [], [], [], []];
var rlist = [[], [], [], [], [], [], [], [], [], []];
var from = "A";


// 文档加载完成后执行
$(document).ready(function () {
    // 通过clist，初始化llist并赋值
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            llist[i][j] = clist[i] + clist[j];
        }
    }

    // 重置nlist列表
    resetList();
    // 加载一言
    reloadHitokoto();
});

// 重置列表函数
function resetList() {
    // 将所有文本框（除随机数文本框）的内容置为defaultNum
    $("input").not("#randNum").val(defaultNum);
    // 锁定AA,BB,CC...单元格
    lockTextBox();
    // 重置nlist
    getMatrixData();
    // 重置rlist
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            rlist[i][j] = defaultNum;
        }
    }
}

// 随机填充数据函数
function setRandomNum() {
    /* 
    rc：从文本框获取的要进行随机填充的行/列数
    tlist：根据rc所生成的需要填充的单元格列表
    */
    let rc = $("#randNum").val();
    // 判断rc是否符合要求
    if (rc < 1 || rc > 10) {
        alert("错误：所输入的值不能小于1或大于10！");
        return -1;
    }
    // 构建tlist
    let tlist = [];
    for (let i = 0, temp = 0; i < rc; i++) {
        for (let j = 0; j < rc; j++) {
            tlist[temp] = clist[i] + clist[j];
            temp++;
        }
    }
    // 重置列表
    resetList();
    // 遍历并填充单元格
    for (let i = 0; i < tlist.length; i++) {
        // 判断是否为弗洛伊德算法
        if (defaultNum == Infinity) {
            // 弗洛伊德算法填充逻辑
            let rand = randomNum(0, 20);
            if (rand < 1) {
                $("#" + tlist[i]).val(Infinity);
            } else {
                $("#" + tlist[i]).val(rand);
            }
        } else {
            // 迪杰斯特拉算法随机填充逻辑
            $("#" + tlist[i]).val(randomNum(0, 20).toString());
        }
    }
    // 重置AA,BB,CC...单元格的数值
    lockTextBox();
    // 更新nlist数组
    getMatrixData();
    // 重新进行计算并展示
    calculate();
}

// 锁定AA,BB,CC...单元格并将数字置为defaultNum
function lockTextBox() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (i == j) {
                // 设置单元格属性，禁用编辑
                $("#" + clist[i] + clist[j]).attr("disabled", "disabled");
                // 设置单元格值
                $("#" + clist[i] + clist[j]).val(defaultNum);
            }
        }
    }
}

// 当数据单元格内容发生变化时
$("input").not("#randNum").change(function () {
    // 同步变化单元格（例如AB与BA） 
    //$("#" + $(this).attr("id")[1] + $(this).attr("id")[0]).val($(this).val());
    // 获取矩阵内所有数据并存入数组nlist
    getMatrixData();
    calculate();
});

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

// 获取矩阵大小
function getMatrixSize() {
    /* 
    rmax：每行位置存在有效数据且最远的单元格
    cmax：每列位置存在有效数据且最远的单元格
    */
    let rmax = [];
    let cmax = [];

    // 判断每行位置存在有效数据且最远的单元格
    for (let i = 0; i < 10; i++) {
        for (let j = 9; j >= 0; j--) {
            if (nlist[i][j] == Infinity || nlist[i][j] <= 0) {
                continue;
            } else {
                rmax[i] = j;
                break;
            }
        }
    }
    // 判断每列位置存在有效数据且最远的单元格
    for (let i = 0; i < 10; i++) {
        for (let j = 9; j >= 0; j--) {
            if (nlist[i][j] == Infinity || nlist[i][j] <= 0) {
                continue;
            } else {
                cmax[i] = j;
                break;
            }
        }
    }
    // 遍历rmax,cmax取最大值max作为函数返回值
    let max = 0;
    for (let i = 0; i < 10; i++) {
        if (rmax[i] > max) {
            max = rmax[i];
        }
    }
    for (let i = 0; i < 10; i++) {
        if (cmax[i] > max) {
            max = cmax[i];
        }
    }
    return max + 1;
}

// 获取矩阵内所有数据并存入数组nlist
function getMatrixData() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {

            // 判断当前单元格是否为数字
            if (typeof ($("#" + llist[i][j]).val()) == 'number' || ($("#" + llist[i][j]).val()) != Infinity) {
                // 是，则直接写入nlist
                nlist[i][j] = Number($("#" + llist[i][j]).val());
            } else {
                // 不是，则写入defaultNum
                nlist[i][j] = defaultNum;
            }
        }
    }
}

// 显示当前矩阵大小 
function matrixSizeSnackbar() {
    mdui.snackbar({
        message: "当前矩阵大小为：" + getMatrixSize() + "x" + getMatrixSize()
    });
}



// 重载右上角一言
function reloadHitokoto() {
    $.ajax({
        url: "https://v1.hitokoto.cn/?encode=text",
        success: function (result) {
            $("#hitokoto").html(result);
        }
    });
}

// 当点击一言标签时，重载一言
$("#hitokoto").click(function () {
    reloadHitokoto();
});



