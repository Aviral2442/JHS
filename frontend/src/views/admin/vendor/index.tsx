import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import VendorList from "./components/VendorList";

const VendorPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Vendor List | Admin" description="Manage your vendors" />
      <VendorList />
    </>
  );
};

export default VendorPage;