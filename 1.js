// 百度地图API功能
var map = new BMapGL.Map("allmap");
map.disableDragging();
var point = new BMapGL.Point(116.404, 39.915);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom();



//创建矩形
function createRect(leftTopPoint, rightBottomPoint) {
    return new BMapGL.Polygon(
        [
            new BMapGL.Point(leftTopPoint.lng, leftTopPoint.lat),
            new BMapGL.Point(rightBottomPoint.lng, leftTopPoint.lat),
            new BMapGL.Point(rightBottomPoint.lng, rightBottomPoint.lat),
            new BMapGL.Point(leftTopPoint.lng, rightBottomPoint.lat),
        ],
        { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 }
    );
}

// var tempRect = createRect(new BMapGL.Point(116.392214, 39.918985), new BMapGL.Point(116.41478, 39.911901))
var tempRect = createRect(new BMapGL.Point(100, 100), new BMapGL.Point(110, 110))
map.addOverlay(tempRect); //增加矩形


function setRectPos(rect, leftTopPoint, rightBottomPoint) {
    rect.setPositionAt(0, new BMapGL.Point(leftTopPoint.lng, leftTopPoint.lat));
    rect.setPositionAt(1, new BMapGL.Point(rightBottomPoint.lng, leftTopPoint.lat));
    rect.setPositionAt(2, new BMapGL.Point(rightBottomPoint.lng, rightBottomPoint.lat));
    rect.setPositionAt(3, new BMapGL.Point(leftTopPoint.lng, rightBottomPoint.lat));
}

let flag = false;
let startPoint;
let endPoint
document.getElementById("allmap").addEventListener("mousedown", function (e) {
    flag = true;
    const p = map.pixelToPoint(new BMapGL.Pixel(e.offsetX, e.offsetY));
    startPoint = p
    setRectPos(tempRect, p, p)
});

document.getElementById("allmap").addEventListener("mousemove", function (e) {
    if (flag) {
      endPoint = map.pixelToPoint(new BMapGL.Pixel(e.offsetX, e.offsetY));
        setRectPos(tempRect, startPoint, endPoint);
    }
});

document.getElementById("allmap").addEventListener("mouseup", function (e) {
    if (flag) {
        setRectPos(tempRect, new BMapGL.Point(100, 100), new BMapGL.Point(100, 100));
        map.addOverlay(createRect(startPoint, endPoint));
        flag = false;
    }
});
