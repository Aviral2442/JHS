import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import RoleList from "./components/RoleList";

const ConsumerPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Manage Roles" description="Manage your roles" />
      <RoleList />
    </>
  );
};

export default ConsumerPage;