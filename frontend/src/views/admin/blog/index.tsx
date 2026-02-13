import React from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import BlogList from "./components/BlogList";

const BlogPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Blog List | Admin" description="Manage your blog posts" />
      {/* <PageBreadcrumb pageTitle="Blog List" /> */}
      <BlogList />
    </>
  );
};

export default BlogPage;