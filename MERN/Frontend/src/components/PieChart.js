import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import axios from "axios";

const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [complaintData, setComplaintData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/admin/complaints/getAllComplaints"
        );
        setComplaintData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Process the fetched data to match the expected format
  const processComplaintData = (complaintData) => {
    const verifiedCount = complaintData.filter((complaint) => complaint.status).length;
    const unverifiedCount = complaintData.filter((complaint) => !complaint.status).length;
  
    return [
      { id: "verified", label: "Verified", value: verifiedCount },
      { id: "unverified", label: "Unverified", value: unverifiedCount },
    ];
  };

  return (
    <ResponsivePie
      data={processComplaintData(complaintData)}
      margin={{ bottom: 100, top: 10 }}
      sortByValue={true}
      activeInnerRadiusOffset={4}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "category10" }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={6}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsOffset={-2}
      arcLinkLabelsDiagonalLength={6}
      arcLinkLabelsStraightLength={12}
      arcLinkLabelsThickness={0}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsRadiusOffset={0.75}
      arcLabelsTextColor="#000000"
      motionConfig="molasses"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 5,
          translateY: 40,
          itemWidth: 55,
          itemHeight: 10,
          itemsSpacing: 20,
          symbolSize: 12,
          itemTextColor: colors.grey[100],
          itemDirection: "left-to-right",
        },
      ]}
    />
  );
};

export default PieChart;
