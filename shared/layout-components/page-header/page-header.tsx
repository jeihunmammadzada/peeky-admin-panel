import dynamic from "next/dynamic";
import React from "react";
const Select = dynamic(() => import("react-select"), { ssr: false });
import {format, subMonths} from 'date-fns';
import store from "@/shared/redux/store";
import { connect } from "react-redux";
import { SetFilterDate } from "@/shared/redux/actions";

const PageHeader = (props: {
  title: string;
  item: string;
  filter?: any;
  active_item: string;
  action?: any;
  actionName?: string;
  SetFilterDate: any
}) => {
  const Multipleselectdata = [
    { value: "1", label: "1 Aylıq" },
    { value: "3", label: "3 Aylıq" },
    { value: "6", label: "6 Aylıq" },
    { value: "12", label: "1 İllik" },
  ];

  const theme = store.getState();


  // handleFilterChange function
  const handleFilterChange = (e: any) => {
    const MonthForBeginDate = subMonths(new Date(), +e.value);
    props.SetFilterDate({ ...theme, beginDate: format(MonthForBeginDate, "yyyy-MM-dd"), endDate: format(new Date(), "yyyy-MM-dd")});
  }

  return (
    <div className="d-md-flex d-block align-items-center justify-content-between page-header-breadcrumb">
      <div>
        <h2 className="main-content-title fs-24 mb-1">{props.title}</h2>
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a>{props.item}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {props.active_item}
          </li>
        </ol>
      </div>
      {props.action != null && (
        <div className="d-flex">
          <div className="justify-content-center">
            <button
              onClick={props.action}
              type="button"
              className="btn btn-primary my-2 btn-icon-text d-inline-flex align-items-center"
            >
              <i className="fe fe-download-cloud me-2"></i> {props.actionName}
            </button>
          </div>
        </div>
      )}

      {props.filter != null && (
        <div className="d-flex">
          <div className="justify-content-center" style={{ width: "200px" }}>
            <Select
              onChange={handleFilterChange}
              name="filter"
              options={Multipleselectdata}
              className="default basic-multi-select"
              id="choices-multiple-default"
              menuPlacement="auto"
              classNamePrefix="Select2"
              defaultValue={[Multipleselectdata[0]]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  local_varaiable: state,
});
export default connect(mapStateToProps, { SetFilterDate })(PageHeader);
