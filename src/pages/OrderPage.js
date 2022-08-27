/* eslint-disable */
import { React, useEffect, useState } from 'react';
import Page from '../components/Page';
import OrderDetail from './OrderDetail';
import User from './User';
import { getOrderAboutUser, getDonorPostDetails, getAllPosts } from '../services/api';
import OrderDonationDetail from './OrderDonationDetail';

export default function OrderPage({ setIsOrder, orderId, name, isDetailofDonation }) {
  const [totalFeedback, setTotalFeedback] = useState([]);
  useEffect(() => {
    async function fetchData() {
      console.log(orderId);
      try {
        if (!isDetailofDonation) {
          const response = await getAllPosts(orderId);
          // console.log('this is if part of donation :');
          setTotalFeedback(response.data.posts);

          console.log(response);
        } else {
          const response = await getDonorPostDetails(orderId);
          console.log('this is response of donee:', response.data.donees);
          setTotalFeedback(response.data.donees);
        }
      } catch (e) {
        console.error(e);
      }
    }
    fetchData();
  }, []);

  // console.log(totalFeedback);
  return (
    <Page title="Dashboard: HungerCare | Admin-panel">
      {isDetailofDonation ? (
        <OrderDonationDetail totalFeedback={totalFeedback} />
      ) : (
        <OrderDetail
          setIsOrder={setIsOrder}
          totalFeedback={totalFeedback}
          title="Customers feedback"
          name={name}
        />
      )}
    </Page>
  );
}
