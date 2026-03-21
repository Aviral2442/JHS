import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import ConsumerList from "./components/RazorpayTransList";

const ConsumerPage: React.FC = () => {
    return (
        <>
            <PageMeta title="Razorpay Transactions" description="Manage your razorpay transactions" />
            <ConsumerList />
        </>
    );
};

export default ConsumerPage;