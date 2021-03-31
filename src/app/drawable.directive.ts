import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[drawable]',
})
export class DrawableDirective implements OnInit {
  // @Output() newImage = new EventEmitter();

  pos = { x: 0, y: 0 };
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;

  constructor(private el: ElementRef) {}
  ngOnInit() {
    this.canvas = this.el.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
  }

  /* @HostListener('mouseup', ['$event'])
  @HostListener('touchend', ['$event'])
  onUp(e) {
    this.newImage.emit(this.getImgData());
  } */

  @HostListener('mouseenter', ['$event'])
  onEnter(e) {
    this.setPosition(e);
  }

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onDown(e) {
    this.setPosition(e);
  }

  @HostListener('mousemove', ['$event'])
  @HostListener('touchmove', ['$event'])
  onMove(e) {
    if ((e.type as String).slice(0, 5) === 'mouse' && e.buttons !== 1) {
      return;
    }
    // Draw Path
    this.ctx.beginPath();
    this.ctx.moveTo(this.pos.x, this.pos.y);
    this.setPosition(e);
    this.ctx.lineTo(this.pos.x, this.pos.y);
    // Style line
    this.ctx.lineWidth = 16;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#4c6ef5';

    this.ctx.stroke();
  }

  // Clear the Screen
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
  // Set Position
  setPosition(e) {
    if ((e.type as String).slice(0, 5) == 'mouse') {
      this.pos.x = e.offsetX;
      this.pos.y = e.offsetY;
    } else {
      this.pos.x =
        e.touches[0].clientX - this.canvas.getBoundingClientRect().left;
      this.pos.y =
        e.touches[0].clientY - this.canvas.getBoundingClientRect().top;
    }
  }
  // Get Image data
  getImgData(): ImageData {
    // Put the imgData
    this.ctx.drawImage(this.canvas, 0, 0, 28, 28);
    // Get imgData
    let imgData = this.ctx.getImageData(0, 0, 336, 336);
    // Preprocess the imgData
    for (let i = 0; i < imgData.data.length; i += 4) {
      const value =
        imgData.data[i] >= 128 ||
        imgData.data[i + 1] >= 128 ||
        imgData.data[i + 2] >= 128
          ? 255
          : 0;

      imgData.data[i] = imgData.data[i + 1] = imgData.data[i + 2] = value;
      imgData.data[i + 3] = 255;
    }
    // this.ctx.putImageData(imgData, 0, 0);
    // Return the imgData
    return this.ctx.getImageData(0, 0, 28, 28);
  }
}
