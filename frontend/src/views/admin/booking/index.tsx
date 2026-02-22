import React from "react";
import PageMeta from "../../../components/common/PageMeta";
import BookingList from "./components/BookingList";

const BookingPage: React.FC = () => {
  return (
    <>
      <PageMeta title="Booking List | Admin" description="Manage your bookings" />
      <BookingList />
    </>
  );
};

export default BookingPage;
