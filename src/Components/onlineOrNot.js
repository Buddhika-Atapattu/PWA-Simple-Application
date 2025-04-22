import { React } from "react";

export default function OnlineOrNot({ status }) {
  return (
    <div
      className={
        status === true ? "bg-success text-center" : "bg-danger text-center"
      }>
      <span className={"text-light text-uppercase fw-bold"}>
        {status === true ? "Online" : "Offline"}
      </span>
    </div>
  );
}
