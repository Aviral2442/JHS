import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import ConsumerList from "./components/CleaningServiceList";

const ConsumerPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Consumer List | Admin" description="Manage your consumer posts" />
      <ConsumerList />
    </>
  );
};

export default ConsumerPage;