import React from "react";
import PageMeta from "../../../../components/common/PageMeta";
import CLOne from "./components/CLOneList";

const BlogPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Category Level One | Admin" description="Manage your category level one items" />
      {/* <PageBreadcrumb pageTitle="Blog List" /> */}
      <CLOne />
    </>
  );
};

export default BlogPage;