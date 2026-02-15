import React from "react";
import PageMeta from "../../../../components/common/PageMeta";
import CLTwo from "./components/CLTwoList";

const BlogPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Category Level Two | Admin" description="Manage your category level two items" />
      {/* <PageBreadcrumb pageTitle="Blog List" /> */}
      <CLTwo />
    </>
  );
};

export default BlogPage;