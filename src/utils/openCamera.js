export default function openCamera(){
    let _this = this;
    _this.getExam = true;
    _this.thisCanvas = document.getElementById("canvasCamera");
    _this.thisContext = this.thisCanvas.getContext("2d");
    _this.thisVideo = document.getElementById("videoCamera");
    _this.thisVideo.style.display = 'block';
    // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
    if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
    }
    // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
    // 使用getUserMedia，因为它会覆盖现有的属性。
    // 这里，如果缺少getUserMedia属性，就添加它。
    if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先获取现存的getUserMedia(如果存在)
            let getUserMedia =
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.getUserMedia;
            // 有些浏览器不支持，会返回错误信息
            // 保持接口一致
            if (!getUserMedia) {//不存在则报错
                return Promise.reject(
                    new Error("getUserMedia is not implemented in this browser")
                );
            }
            // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
            return new Promise(function (resolve, reject) {
                getUserMedia.call(navigator, constraints, resolve, reject);
            });
        };
    }
    let constraints = {
        audio: false,
        video: {
            width: this.videoWidth,
            height: this.videoHeight,
            transform: "scaleX(-1)"
        }
    };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            // 旧的浏览器可能没有srcObject
            if ("srcObject" in _this.thisVideo) {
                _this.thisVideo.srcObject = stream;
            } else {
                _this.thisVideo.src = window.URL.createObjectURL(stream);
            }
            _this.thisVideo.onloadedmetadata = e => {
                _this.thisVideo.play();
                // canvas画图
                _this.thisContext.drawImage(
                    _this.thisVideo,
                    0,
                    0,
                    _this.videoWidth,
                    _this.videoHeight
                );
            };
            _this.camera = true;
        })
        .catch(err => {
            console.log(err);
        });
}
