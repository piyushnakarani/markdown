declare module 'html2pdf.js' {
  interface Html2PdfPageBreakOptions {
    mode?: string | string[];
    before?: string | string[];
    after?: string | string[];
    avoid?: string | string[];
  }

  interface Html2PdfOptions {
    pagebreak?: Html2PdfPageBreakOptions;
  }
}
