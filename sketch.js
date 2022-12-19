const triangle = []
let points = []
let max
let btn

function setup() {
  createCanvas(500, 500)

  triangle.push(createVector(10, 10))
  triangle.push(createVector(width - 10, 10))
  triangle.push(createVector(width / 2, height - 10))

  // First random point inside the triangle
  points.push(pointInsideTriangle())

  max = document.querySelector(".input").value
  btn = document.querySelector(".btn")

  btn.addEventListener("click", () => {
    max = document.querySelector(".input").value
    points = [pointInsideTriangle()]
  })
}

function draw() {
  translate(0, height) // change coordenates system to left bottom
  scale(1, -1)

  background(200)
  strokeWeight(5)

  stroke(255, 255, 0)
  triangle.forEach((p) => {
    point(p.x, p.y)
  })

  stroke(0, 100, 0)
  points.forEach((p) => {
    point(p.x, p.y)
  })

  let next = getNextPoint(points[points.length - 1])
  points.push(next)

  if (points.length > max) {
    points.splice(-1, 1)
  }
}

function pointInsideTriangle() {
  const A = triangle[0]
  const B = triangle[1]
  const C = triangle[2]

  let w1 = Math.random()
  let w2 = Math.random()

  if (w1 + w2 > 1) {
    w1 = 1 - w1
    w2 = 1 - w2
  }

  const v1 = createVector((B.x - A.x) * w1, (B.y - A.y) * w1)
  const v2 = createVector((C.x - A.x) * w2, (C.y - A.y) * w2)

  return createVector(v1.x + v2.x + 10, v1.y + v2.y + 10)
}

function getNextPoint(current) {
  const rndP = triangle[parseInt(random(3))]

  return createVector((rndP.x + current.x) * 0.5, (rndP.y + current.y) * 0.5)
}
