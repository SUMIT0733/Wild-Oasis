import styled from "styled-components";
import Spinner from "../../ui/Spinner.jsx";
import { useRecentStays } from "./useRecentStays.js";
import Stats from "./Stats.jsx";
import { useCabins } from "../cabins/useCabins.js";
import SalesChart from "./SalesChart.jsx";
import DurationChart from "./DurationChart.jsx";
import TodayActivity from "../check-in-out/TodayActivity.jsx";
import { useRecentBookings } from "./useRecentBookings.js";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    confirmed,
    numdays,
  } = useRecentStays();
  const { isLoading: isLoadingcabins, cabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingcabins)
    return <Spinner />;

  // console.log(cabins);

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmed}
        numDays={numdays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmed={confirmed} />
      <SalesChart bookings={bookings} numDays={numdays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
