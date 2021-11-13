const leaveField = [
  {
    title: "Name",
    label: "Enter your name",
    name: "name",
    type: "text",
    required: true,
  },
  {
    title: "Designation",
    label: "Enter your Designation",
    name: "designation",
    type: "text",
    required: true,
  },
  {
    title: "Reason for leave",
    name: "reasonForLeave",
    label: "Enter reason for leave",
    type: "text",
    required: true,
  },
  {
    title: "Period of leave applied for & date from which required",
    name:"PeriodDate",
    label:"Period of leave & date",
    type:"text",
    required:true
  },
  {
    title: " No. Of CL already availed",
    name: "noOfClAlreadyAvailed",
    label: "Enter No. of CL availed",
    type: "text",
    required: true,
  },
  {
    name: "workArrangement",
    type: "workArrangement",
    required: true,
  },
];

export default leaveField;
