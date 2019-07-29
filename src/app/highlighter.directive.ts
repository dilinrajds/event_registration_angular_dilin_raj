import { Directive, OnInit, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlighter]'
})
export class HighlighterDirective implements OnInit {
  @Input('appHighlighter') colorChange = '';
  ngOnInit(): void {
  }

  constructor(private el: ElementRef) {
  }
  @HostListener('click') clickEvent() {
    this.el.nativeElement.style.backgroundColor = this.colorChange;
  }
}

