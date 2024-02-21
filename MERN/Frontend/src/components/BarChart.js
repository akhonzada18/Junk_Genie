import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const [allworker, setAllWoker] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/workers/getAllWorkers"
        );
        setAllWoker(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const processBackendData = (backendData) => {
    const monthlyData = {};

    backendData.forEach((item) => {
      const monthName = new Date(item.createdAt).toLocaleString("en-US", {
        month: "short",
      });

      if (!monthlyData[monthName]) {
        monthlyData[monthName] = { Verified: 0, Unverified: 0 };
      }

      if (item.verified) {
        monthlyData[monthName].Verified += 1;
      } else {
        monthlyData[monthName].Unverified += 1;
      }
    });

    // Convert the processed data into the desired format
    const resultData = Object.keys(monthlyData).map((month) => ({
      month,
      Verified: monthlyData[month].Verified,
      Unverified: monthlyData[month].Unverified,
    }));

    return resultData;
  };

  const customTheme = {
    textColor: colors.grey[100],
    axis: {
      ticks: {
        text: {
          fill: colors.grey[100],
        },
      },
      legend: {
        text: {
          fill: colors.grey[100],
        },
      },
    },
    legends: [
      {
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 10,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 15,
        itemTextColor: colors.grey[100],
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
  };

  return (
    <ResponsiveBar
      theme={customTheme}
      data={processBackendData(allworker)}
      keys={["Verified", "Unverified"]}
      indexBy="month"
      margin={{ top: 15, right: 110, bottom: 80, left: 60 }}
      padding={0.35}
      innerPadding={4}
      groupMode="grouped"
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "category10" }}
      borderColor={colors.grey[100]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        tickTextColor: colors.grey[100],
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      enableGridX={false}
      enableGridY={false}
      enableLabel={false}
      labelSkipWidth={1}
      labelSkipHeight={1}
      tickTextColor={colors.grey[100]}
      labelTextColor={colors.grey[100]}
      legends={[
        {
          dataFrom: "keys",
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 10,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 15,
          itemTextColor: colors.grey[100],
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="bar chart"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      }
    />
  );
};

export default BarChart;
