/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { Stack, Wrap, Text, Heading } from "@chakra-ui/react";
import moment from "moment";
import TransferCard from "../components/TransferCard";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import { requestArray } from "../wallet";

const History = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(requestArray);
  }, [transactions]);

  return (
    <Sidebar>
      <Breadcrumbs links={["Home", "Dashboard", "History"]} />
      <Heading mt={8} ml={4}>
        History
      </Heading>
      <Stack p={4} gap={3}>
        <Wrap spacing={8}>
          {transactions.map((transaction, index) => {
            if (transaction[9] === false) {
              return (
                <TransferCard
                  bobo={index}
                  key={index}
                  pcp={transaction[1]}
                  pcpSpecialty={transaction[2]}
                  pcpAddress={transaction[0]}
                  pcpEmail={transaction[3]}
                  requester={transaction[5]}
                  requesterAddress={transaction[4]}
                  requesterSpecialty={transaction[6]}
                  requesterEmail={transaction[7]}
                  time={moment(
                    new Date(
                      +new Date() - Math.floor(Math.random() * 10000000000)
                    )
                  ).format("llll")}
                  buttonTF={false}
                />
              );
            }
          }) || <Text>No Pending Requests</Text>}
        </Wrap>
      </Stack>
    </Sidebar>
  );
};

export default History;