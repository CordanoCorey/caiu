import { Component, OnInit, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'iu-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  constructor(private renderer: Renderer2) {}

  @Input() containerToPrint: string;
  @Input() customStyleString = '';
  @Input() enableDebug = false;

  slice = Function.call.bind(Array.prototype.slice);
  styleText: string;
  mediaText = '';

  getContainerElements(container) {
    // tslint:disable-next-line: deprecation
    this.slice(document.all).forEach(x => {
      if (container.contains(x)) {
        // gets each element within the container; use this to get the class names and styles
        let selector = ''; // Selector is either the class on the element, or just the normal selector (Ex: 'p' for <p></p>)
        if (x.classList.length > 1) {
          // get all of the classes to be used as selectors
          x.classList.forEach(function(cl, i) {
            i = i + 1;
            if (i === x.classList.length) {
              selector = selector + ' .' + cl;
            } else {
              selector = selector + ' .' + cl + ', ';
            }
          });
        } else if (x.classList.length === 1) {
          selector = '.' + x.classList[0];
        } else {
          selector = x.localName;
        }
        this.getStyleSheets(selector);
      }
    });
  }

  getStyleSheets(selector) {
    this.slice(document.styleSheets).forEach(y => {
      if (y.href === null && y.cssRules !== undefined) {
        // Makes sure stylesheets aren't external
        this.slice(y.cssRules).forEach(rule => {
          if (rule.selectorText !== undefined) {
            if (rule.selectorText.includes(selector)) {
              if (!this.styleText.includes(rule.cssText)) {
                this.styleText = this.styleText + ' ' + rule.cssText;
              }
            }
          }
        });
      }
    });
  }

  getMediaQueries() {
    this.slice(document.styleSheets).forEach(x => {
      if (x.href === null && x.cssRules !== undefined) {
        this.slice(x.cssRules).forEach(y => {
          if (y.media !== undefined) {
            if (y.media.length > 0) {
              let mediaStyles = '';
              this.slice(y.cssRules).forEach(z => {
                mediaStyles = mediaStyles + ' ' + z.cssText;
              });
              /* this.mediaText = this.mediaText + ' <style media="' + y.conditionText + '"> ' + mediaStyles + ' </style> '; */
              this.mediaText = this.mediaText + ' @media ' + y.conditionText + ' { ' + mediaStyles + ' }';
            }
          }
        });
      }
    });
  }

  print() {
    this.styleText = '#' + this.containerToPrint + ' { margin: 0 auto; }';
    const container = this.renderer.selectRootElement('#' + this.containerToPrint, true);
    const classes = [];
    this.getContainerElements(container);
    this.getMediaQueries();

    if (this.styleText.includes('background-image')) {
      console.warn(
        'Defined container has styles that utilizes a background-image. ' +
          'Unless your browser settings allow for you to print background images. ' +
          'View guide here: https://github.com/Soundwubz/Element-Printer/blob/master/PRINTGUIDE.md'
      );
    }

    if (this.customStyleString !== '') {
      this.styleText = this.styleText + ' ' + this.customStyleString;
      this.styleText = this.styleText.replace(/\s+/g, ' ').trim();
    }

    const html = container.outerHTML.replace(/\s+/g, ' ').trim();

    if (this.enableDebug) {
      console.dir(this.containerToPrint);
      console.dir(container);
      console.log('document.styleSheets: ');
      console.dir(document.styleSheets);
      console.log(this.styleText);
      console.log(this.mediaText);
      console.log(html);
    }

    // Creating Print Window
    const win = window.open('', 'Print Calendar', 'height=1080,width=1920');
    win.document.write('<html><head>');
    win.document.write('<title>Element Printer</title>');
    win.document.write('<style>');
    // Style goes here
    win.document.write(this.styleText);
    // Media styles go here
    win.document.write(this.mediaText);
    win.document.write('</style>');
    win.document.write('</head><body style="margin: 0 auto;">');
    win.document.write(html);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
    /* win.close(); */
  }

  ngOnInit() {}
}

//
//  Github: https://github.com/Soundwubz/Element-Printer
//
