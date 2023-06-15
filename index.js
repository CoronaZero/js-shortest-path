/* 
clist:前十个字母列表
llist：前十个字母排列组合后的列表
nlist：获取单元格内所有数据组合而成的二维数组
from：起点
to：终点
 */

var clist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var llist = [];
var nlist = [[], [], [], [], [], [], [], [], [], []];
var from = "A";
var to = "B";

// 通过clist，初始化llist并赋值
var temp = 0;
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        llist[temp] = clist[i] + clist[j];
        temp++;
    }
}
// 销毁临时变量
temp = undefined;

$(document).ready(function () {
    // 文档加载完成后，立即重置列表
    resetList();
});

// 重置列表函数
function resetList() {
    // 将所有文本框（除随机数文本框）的内容置为-1
    $("input").not("#randNum").val('-1');
    // 锁定AA,BB,CC...单元格
    lockTextBox();
    // 重置nlist
    getMatrixData();
}

// 随机填充数据函数
function setRandomNum() {
    /* 
    rc：从文本框获取的要进行随机填充的行/列数
    tlist：根据rc所生成的需要填充的单元格列表
    */
    var rc = $("#randNum").val();
    // 判断rc是否符合要求
    if (rc < 1 || rc > 10) {
        alert("错误：所输入的值不能小于1或大于10！");
        return -1;
    }
    // 构建tlist
    var tlist = [];
    for (var i = 0, temp = 0; i < rc; i++) {
        for (var j = 0; j < rc; j++) {
            tlist[temp] = clist[i] + clist[j];
            temp++;
        }
    }
    // 重置列表
    resetList();
    // 遍历并填充单元格
    for (var i = 0; i < tlist.length; i++) {
        $("#" + tlist[i]).val(randomNum(-1, 20).toString());
    }
    // 重置AA,BB,CC...单元格的数值
    lockTextBox();
    // 更新nlist数组
    getMatrixData();
}

// 锁定AA,BB,CC...单元格并将数字置为0
function lockTextBox() {
    for (var i = 0, temp = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i == j) {
                // 设置单元格属性，禁用编辑
                $("#" + clist[i] + clist[j]).attr("disabled", "disabled");
                // 设置单元格值
                $("#" + clist[i] + clist[j]).val("-1");
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
    var rmax = [];
    var cmax = [];

    // 判断每行位置存在有效数据且最远的单元格
    for (var i = 0; i < 10; i++) {
        for (var j = 9; j >= 0; j--) {
            if (nlist[i][j] <= 0) {
                continue;
            } else {
                rmax[i] = j;
                break;
            }
        }
    }
    // 判断每列位置存在有效数据且最远的单元格
    for (var i = 0; i < 10; i++) {
        for (var j = 9; j >= 0; j--) {
            if (nlist[j][i] <= 0) {
                continue;
            } else {
                cmax[i] = j;
                break;
            }
        }
    }
    // 遍历rmax,cmax取最大值max作为函数返回值
    var max = 0;
    for (var i = 0; i < 10; i++) {
        if (rmax[i] > max) {
            max = rmax[i];
        }
    }
    for (var i = 0; i < 10; i++) {
        if (cmax[i] > max) {
            max = cmax[i];
        }
    }
    return max + 1;
}

// 获取矩阵内所有数据并存入数组nlist
function getMatrixData() {
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            nlist[i][j] = $("#" + llist[i * 10 + j]).val();
        }
    }
}

// 显示当前矩阵大小 
function matrixSizeSnackbar() {
    mdui.snackbar({
        message: "当前矩阵大小为：" + getMatrixSize() + "x" + getMatrixSize()
    });
}

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

// 下拉选择框随机取点
function setRandomPoint() {
    // 判断矩阵大小是否小于等于1
    if (getMatrixSize() <= 1) {
        // 无法给出随机两点，发出警告提示
        alert("当前矩阵大小小于2，请填写矩阵后使用此功能");
    } else {
        var ra, rb;
        // 死循环，直到取不同的两点退出
        while (true) {
            ra = randomNum(0, getMatrixSize() - 1);
            rb = randomNum(0, getMatrixSize() - 1);
            if (ra != rb) {
                break;
            }
        }
        // 设置下拉选择框的值
        $("#from").val(clist[ra]);
        $("#to").val(clist[rb]);
        // 设置全局变量from、to的值
        from = $("#from").val();
        to = $("#to").val();
    }
}