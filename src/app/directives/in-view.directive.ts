import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({ selector: '[inView]' })
export class InViewDirective implements AfterViewInit {
  @Input() inView!: Function;

  @Output() visible = new EventEmitter();

  constructor(
    private vcRef: ViewContainerRef,
    private tplRef: TemplateRef<any>
  ) {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.tplRef);
  }

  ngAfterViewInit() {
    const commentEl = this.vcRef.element.nativeElement; // template
    const elToObserve = commentEl.parentElement;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.inView(true);
          }
        });
      },
      { threshold: [0, 0.1, 0.9, 1] }
    );
    observer.observe(elToObserve);
  }
}
