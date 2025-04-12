import React, { MouseEvent } from "react";
import DataTable from "react-data-table-component";
// import DataTableExtensions from "react-data-table-component-extensions";
const DataTableExtensions: any = dynamic(
  () => import("react-data-table-component-extensions"),
  { ssr: false }
);

import differenceBy from "lodash/differenceBy";
// import { tableDataItems } from ""
import { Button } from "react-bootstrap";
import "react-data-table-component-extensions/dist/index.css";
import dynamic from "next/dynamic";


