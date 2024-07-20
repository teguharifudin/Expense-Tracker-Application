import React, { useEffect, useState, useContext } from "react";
import { Progress } from "antd";
import axios from "axios";
import { message } from "antd";
import { ConfigContext } from '../context/ConfigContext';

const ExpenseAnalytics = ({ allTransaction }) => {
  const authToken = localStorage.getItem('authToken');
  const {baseUrl} = useContext(ConfigContext);
  const [categories, setCategories] = useState('');
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/category/expense`, {
          headers: {
              Authorization: `Bearer ${authToken}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        message.error("Fetch issues with categories");
      }
    };
    fetchCategories();
  }, [authToken, baseUrl]);

  const totalTransaction = allTransaction.length;
  const totalExpense = allTransaction.length;
  const totalExpensePercent = (totalExpense / totalTransaction) * 100;
  const totalTurnover = allTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalExpenseTurnover = allTransaction.reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnoverPercent = (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <div class="container my-5">
      <div class="row">
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header bg-success text-white">
              Total Transactions:{" "}
              <span class="total-transaction">{totalTransaction}</span>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-12">
                  <div class="progress-wrapper">
                    <Progress
                      type="circle"
                      percent={totalExpensePercent.toFixed(2)}
                      strokeColor={"red"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card mb-4">
            <div class="card-header bg-info text-white">
              Total Turnover:{" "}
              <span class="total-turnover">{totalTurnover}</span>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-12">
                  <div class="progress-wrapper">
                    <Progress
                      type="circle"
                      percent={totalExpenseTurnoverPercent.toFixed(2)}
                      strokeColor={"red"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mt-3">
          <div class="col-md-12">
            <h4 class="text-center mb-3">Breakdown by category</h4>
            {Array.isArray(categories) && categories.map((category) => {
              const amount = allTransaction
              .filter(
                (transaction) =>
                  transaction.category._id === category._id
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
              return (
                amount > 0 && (
                  <div class="card card-equal-width mb-3">
                    <div class="card-body">
                      <h5>{category.name}</h5>
                      <div class="progress">
                        <div
                          class="progress-bar progress-bar-danger"
                          role="progressbar"
                          style={{  }}
                          aria-valuenow={(amount / totalExpense) * 100}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseAnalytics;