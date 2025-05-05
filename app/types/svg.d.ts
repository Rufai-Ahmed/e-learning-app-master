declare namespace JSX {
  interface IntrinsicElements {
    'sodipodi:namedview': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'rdf:RDF': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'cc:Work': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'dc:format': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'dc:type': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    'dc:title': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
} 