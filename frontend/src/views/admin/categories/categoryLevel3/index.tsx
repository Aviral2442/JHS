import React from "react";
import PageMeta from "../../../../components/common/PageMeta";
import CLThree from "./components/CLThreeList";

const BlogPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Category Level Three | Admin" description="Manage your category level three items" />
      {/* <PageBreadcrumb pageTitle="Blog List" /> */}
      <CLThree />
    </>
  );
};

export default BlogPage;