import { React, useEffect, useState } from 'react';
import Page from '../components/Page';
import CustomerFeedback from './CustomerFeedback';
import User from './User';
import { getTotalFeedback } from '../services/api';

function Feedback() {
  const [totalFeedback, setTotalFeedback] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getTotalFeedback();
        setTotalFeedback(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  });
  // console.log(totalFeedback);
  return (
    <Page title="Dashboard: Dhobies | Admin-panel">
      <CustomerFeedback totalFeedback={totalFeedback} title="Customers feedback" />
    </Page>
  );
}

export default Feedback;
