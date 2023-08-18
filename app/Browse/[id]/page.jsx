import React from "react";
import Summary from "@/components/Summary";

const page = ({ params }) => {
  return (
    <div>
      <div className="">
        <Summary item_id={params.id} />
      </div>
    </div>
  );
};

export default page;
