// To extend the TypeScript definitions to recognize imports with the ?react query
declare module "*.svg?react" {
  import React = require("react");
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
