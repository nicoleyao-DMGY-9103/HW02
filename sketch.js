// camera object
let mCamera;

// model object
let mModel;

// array to keep track of detected "things"
let mDetected = [];

// 添加一个数组来存储轨迹点
let mTrailPoints = [];

// 添加变量来存储轨迹点和控制绘制
let lastDrawTime = 0;
const DRAW_INTERVAL = 100;
let currentX = 0;
let currentY = 0;
let stepX = 5;
let stepY = 5;

// start camera and create model
function preload() {
  mCamera = createCapture(VIDEO, { flipped: true });
  mCamera.hide();

  mModel = ml5.handPose();
}

// when some "thing" is detected, just copy it to mDetected
function updateDetected(detected) {
  mDetected = detected;
  mModel.detect(mCamera, updateDetected);
}

function setup() {
  // create p5js canvas
  createCanvas(windowWidth, windowHeight);

  // 设置摄像头大小
  mCamera.size(320, 240);

  // run the model once on camera image
  mModel.detect(mCamera, updateDetected);
}

function draw() {
  // 不再每帧清除背景
  // 在左上角绘制缩小的摄像头画面
  image(mCamera, 0, 0, 320, 240);

  // 自动更新位置
  currentX += stepX;
  if (currentX > width || currentX < 0) {
    stepX = -stepX;
    currentY += 30; // 换行
  }
  
  // 重置到顶部
  if (currentY > height) {
    currentY = 0;
  }

  // 按时间间隔生成图案
  if (millis() - lastDrawTime > DRAW_INTERVAL) {
    drawRandomShape(currentX, currentY);
    lastDrawTime = millis();
  }

  // 仍然保留手指控制的部分
  for (let dObj of mDetected) {
    const indexFinger = dObj.keypoints[8];
    if (indexFinger) {
      // 在摄像头画面中显示指示点
      fill(0, 255, 0);
      noStroke();
      circle(indexFinger.x, indexFinger.y, 8);
      
      // 将摄像头坐标映射到画布坐标用于生成图案
      let mappedX = map(indexFinger.x, 0, mCamera.width, 0, width);
      let mappedY = map(indexFinger.y, 0, mCamera.height, 0, height);
      
      // 使用映射后的位置
      currentX = mappedX;
      currentY = mappedY;
    }
  }
}

function drawRandomShape(x, y) {
  push();
  
  // 随机颜色和透明度
  let rr = random(255);
  let rg = random(255);
  let rb = random(255);
  let alpha = random(100, 255);
  stroke(rr, rg, rb, alpha);
  noFill();
  
  // 随机线条粗细
  let strokeW = random(10);
  strokeWeight(strokeW);
  
  // 随机旋转
  translate(x, y);
  angleMode(DEGREES);
  let rotation = random(-15, 15);
  rotate(rotation);
  
  // 随机形状大小
  let shapeSize = random(10, 25);
  
  // 绘制矩形（带随机圆角）
  rect(
    0,
    0,
    shapeSize,
    shapeSize,
    random(0, 10),
    random(0, 10),
    random(0, 10),
    random(0, 10)
  );
  
  pop();
}
