// Assignment 2 - Interactive Drawing App
// Sathwika Nevoori

// Step 4: Select canvas, context, and buttons
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var clearBtn = document.getElementById("clearBtn");
var brushBtn = document.getElementById("brushBtn");
var eraserBtn = document.getElementById("eraserBtn");
var brushSize = document.getElementById("brushSize");
var sizeLabel = document.getElementById("size-label");
var colorBtns = document.querySelectorAll(".color-btn");

// Step 5: Set the canvas size
canvas.width = 620;
canvas.height = 420;

// Track drawing state
var isDrawing = false;
var currentColor = "#e74c3c";
var currentTool = "brush";

// ── Color picker ──
colorBtns.forEach(function(btn) {
  btn.addEventListener("click", function() {
    colorBtns.forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentColor = btn.getAttribute("data-color");
    currentTool = "brush";
    brushBtn.classList.add("active");
    eraserBtn.classList.remove("active");
  });
});

// ── Brush size slider ──
brushSize.addEventListener("input", function() {
  sizeLabel.textContent = brushSize.value;
});

// ── Tool buttons ──
brushBtn.addEventListener("click", function() {
  currentTool = "brush";
  brushBtn.classList.add("active");
  eraserBtn.classList.remove("active");
  canvas.style.cursor = "crosshair";
});

eraserBtn.addEventListener("click", function() {
  currentTool = "eraser";
  eraserBtn.classList.add("active");
  brushBtn.classList.remove("active");
  canvas.style.cursor = "cell";
});

// Step 6: mousedown - start drawing
canvas.addEventListener("mousedown", function(e) {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

// Step 7: mousemove - draw while mouse is held
canvas.addEventListener("mousemove", function(e) {
  if (!isDrawing) return;

  ctx.lineWidth = brushSize.value;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  if (currentTool === "eraser") {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = parseInt(brushSize.value) * 3;
  } else {
    ctx.strokeStyle = currentColor;
  }

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});

// Step 8: mouseup - stop drawing
canvas.addEventListener("mouseup", function() {
  isDrawing = false;
});

// Step 8: mouseleave - stop drawing if mouse leaves canvas
canvas.addEventListener("mouseleave", function() {
  isDrawing = false;
});

// Step 9: Clear button
clearBtn.addEventListener("click", function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});