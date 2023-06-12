/* 
        clist:前十个字母列表
        llist：前十个字母排列组合后的列表
        */
var clist = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
var llist = [];
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
    // 将所有文本框（除随机数文本框）的内容置为0
    $("input").not("#randNum").val('0');
    // 锁定AA,BB,CC...单元格
    lockTextBox();
}

// 随机填充数据函数
function setRandomNum() {
    /* 
    rc：从文本框获取的要进行随机填充的行/列数
    tlist：根据rc所生成的需要填充的单元格列表
    */
    rc = $("#randNum").val();
    // 判断rc是否符合要求
    if (rc < 1 || rc > 10) {
        alert("错误：所输入的值不能小于1或大于10！");
        return -1;
    }
    // 构建tlist
    tlist = [];
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
        $("#" + tlist[i]).val(randomNum(0, 20).toString());
    }
    // 重置AA,BB,CC...单元格的数值
    lockTextBox();
}

// 锁定AA,BB,CC...单元格并将数字置为0
function lockTextBox() {
    for (var i = 0, temp = 0; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            if (i == j) {
                // 设置单元格属性，禁用编辑
                $("#" + clist[i] + clist[j]).attr("disabled", "disabled");
                // 设置单元格值
                $("#" + clist[i] + clist[j]).val("0");
            }
        }
    }
}

// 同步变化单元格（例如AB与BA）
$("input").not("#randNum").on("input propertychange", function () {
    $("#" + $(this).attr("id")[1] + $(this).attr("id")[0]).val($(this).val());
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