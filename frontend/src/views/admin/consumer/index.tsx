import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import ConsumerList from "./components/ConsumerList";

const ConsumerPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Consumer List | Admin" description="Manage your consumer posts" />
      {/* <PageBreadcrumb pageTitle="Consumer List" /> */}
      <ConsumerList />
    </>
  );
};

export default ConsumerPage;