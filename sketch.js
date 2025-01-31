const emotions = {
    happy: {
      keywords: ['高兴', '开心', '快乐', '幸福', '喜悦'],
      color: [255, 215, 0], // 亮金色
      count: 0
    },
    jealous: {
      keywords: ['嫉妒', '羡慕', '眼红', '酸'],
      color: [34, 139, 34], // 森林绿
      count: 0
    },
    sad: {
      keywords: ['悲伤', '难过', '伤心', '泪', '哭泣'],
      color: [70, 130, 180], // 钢蓝色
      count: 0
    },
    angry: {
      keywords: ['生气', '愤怒', '发火', '恼火', '暴躁'],
      color: [255, 0, 0], // 纯红色
      count: 0
    },
    surprised: {
      keywords: ['惊讶', '吃惊', '震惊', '意外'],
      color: [147, 112, 219], // 紫罗兰色
      count: 0
    },
    fearful: {
      keywords: ['害怕', '恐惧', '惊恐', '恐慌'],
      color: [25, 25, 112], // 午夜蓝
      count: 0
    },
    anticipate: {
      keywords: ['期待', '盼望', '等待', '憧憬'],
      color: [255, 165, 0], // 橙色
      count: 0
    }
};

let inputText;
let bubbles = [];
let lastAnalysisTime = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // 创建输入控件
  inputText = createInput('输入你的感受...');
  inputText.size(300);
  inputText.position(20, 20);
  
  const analyzeBtn = createButton('生成情绪气泡');
  analyzeBtn.position(330, 20);
  analyzeBtn.mousePressed(analyzeText);
  
  // 初始化气泡数组
  initBubbles(100); // 预生成100个隐藏气泡
}

function draw() {
  background(25);
  
  // 更新并绘制气泡
  bubbles.forEach(bubble => {
    if (!bubble.active) return;
    
    // 浮动动画
    bubble.y += bubble.speed;
    if (bubble.y < -50) resetBubble(bubble);
    
    // 鼠标互动
    const d = dist(mouseX, mouseY, bubble.x, bubble.y);
    if (d < bubble.size/2) {
      bubble.size *= 1.02;
    }
    
    fill(...bubble.color, bubble.alpha);
    noStroke();
    ellipse(bubble.x, bubble.y, bubble.size);
  });
}

function analyzeText() {
  if (millis() - lastAnalysisTime < 1000) return;
  lastAnalysisTime = millis();

  // 重置计数器
  Object.values(emotions).forEach(e => e.count = 0);
  const text = inputText.value();
  let total = 0;

  // ==== 修复1：正确统计情绪次数 ====
  Object.entries(emotions).forEach(([key, e]) => {
    let emotionCount = 0;
    e.keywords.forEach(word => {
      const regex = new RegExp(word, 'g');
      const matches = text.match(regex) || [];
      emotionCount += matches.length;
    });
    e.count = emotionCount;
    total += emotionCount;
  });

  // ==== 修复2：正确分配气泡 ====
  if (total > 0) {
    // 重置气泡状态
    bubbles.forEach(bubble => bubble.active = false);
    
    let activatedCount = 0;
    
    Object.entries(emotions).forEach(([key, e]) => {
      const targetCount = Math.floor(bubbles.length * (e.count / total));
      
      for (let i = 0; i < bubbles.length && activatedCount < bubbles.length; i++) {
        if (targetCount <= 0) break;
        
        if (!bubbles[i].active) {
          Object.assign(bubbles[i], {
            color: e.color,
            size: random(10, 50),
            alpha: random(100, 200),
            speed: random(-0.5, -1.5),
            active: true
          });
          resetBubble(bubbles[i]);
          activatedCount++;
          targetCount--;
        }
      }
    });
  }
}

function initBubbles(num) {
  for (let i = 0; i < num; i++) {
    bubbles.push({
      x: 0,
      y: 0,
      size: 0,
      color: [255],
      alpha: 0,
      speed: 0,
      active: false
    });
  }
}

function resetBubble(bubble) {
  bubble.x = random(width);
  bubble.y = height + random(100);
  bubble.alpha = random(100, 200);
  bubble.speed = random(-0.5, -1.5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
