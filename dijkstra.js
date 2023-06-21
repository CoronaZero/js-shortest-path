/* 
defaultNum：默认填充数字
*/
var defaultNum = 0;

// 结果计算函数
function calculate() {

    /* 
    dist 用来存储路径值(权)
    visited  用来存储顶点是否访问
    src  用于存储起点
    graph 用于存储图
    */
    let dist = []
    let visited = []
    let src
    let graph=[]

    // 初始化graph列表
    for(let i=0;i<getMatrixSize();i++){
        for(let j=0;j<getMatrixSize();j++){
            graph[i][j]=nlist[i][j];
        }
    }

    // 初始化src
    for(let i=0;i<10;i++){
        if(clist[i]==$("#from").val()){
            src=i;
        }
    }
    
    const length = graph.length
    const INF = Number.MAX_SAFE_INTEGER

    //初始化dist 和 visited 列表
    for (let i = 0; i < length; i++) {
        dist[i] = INF
        visited[i] = false
    }

    //选择第一个节点 进入循环
    dist[src] = 0

    let i = 0
    while (i < length - 1) {
        //此时对应节点 已经访问设置 true
        visited[src] = true
        //找到对应节点 的 对应的边集合
        let currentEdges = graph[src]
        //遍历边,更新路径
        for (let i = 0; i < currentEdges.length; i++) {
            if (currentEdges[i] !== 0) {
                //存在边 , 找到最短路径  例如
                //A=>B=>C 最短路径的权
                //为 A=>B 的权(dist[src]) +  B=>C的权(currentEdegs[i]) 和 A=>C(dist[i]) 的权 进行比较
                if (dist[src] + currentEdges[i] < dist[i]) {
                    //符合上面条件 更新dist[i] 保证dist[i]是每次探路的最短路径
                    dist[i] = currentEdges[i] + dist[src]
                }
            }
        }
        //迪杰斯特拉的核心算法 , 找到最短路径 重新探路.
        //选择最短路径
        let min = INF
        let minIndex = -2
        for (let i = 0; i < dist.length; i++) {
            if (!visited[i] && dist[i] < min) {
                min = dist[i]
                minIndex = i
            }
        }

        //进入下一次循环
        src = minIndex
        i++
    }

    // 重置结果面板中的内容
    for(let i=0;i<10;i++){
        $("#r"+clist[i]).text("INF");
    }
    // 将结果展示于结果面板
    for(let i=0;i<dist.length;i++){
        $("#r"+clist[i]).text(dist[i]);
    }
}

// 若起点发生变动
$("#from").change(function(){
    // 修改结果面板的起点值
    $("#initpoint").text($("#from").val());
    // 重新计算
    getMatrixData();
    calculate();
})