import React, { useState, useEffect } from "react";
import DisplayTable from "./DisplayTable";
import DisplayChart from "./DisplayChart";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const ordersClient = new W3CWebSocket(`${process.env.REACT_APP_SOCKET_BASE_URL}/orders`);
const ordersStatsClient = new W3CWebSocket(`${process.env.REACT_APP_SOCKET_BASE_URL}/orders/by-day`);

const Order = () => {
  
  const [orders, setOrders] = useState([]);
  const [ordersStats, setOrdersStats] = useState([]);

    useEffect(() => {
      fetchOrders();
      fetchOrderStats();
    }, []);
  
    const fetchOrders = () => {
      ordersClient.onopen = () => {
        console.log('WebSocket Client Connected');
      };

      ordersClient.onmessage = (message) => {
        setOrders(JSON.parse(message.data));
      };

      ordersClient.onclose = () => {
        alert("connection is closed");
      }
    }

    const fetchOrderStats = () => {
      ordersStatsClient.onopen = () => {
        console.log('WebSocket Client Connected');
      };

      ordersStatsClient.onmessage = (message) => {
        setOrdersStats(JSON.parse(message.data));
      };

      ordersStatsClient.onclose = () => {
        alert("connection is closed");
      }
    }

    return (
      <div>
        <DisplayTable orders={orders} />
        <DisplayChart data={ordersStats} />
      </div>
    )
}
export default Order;