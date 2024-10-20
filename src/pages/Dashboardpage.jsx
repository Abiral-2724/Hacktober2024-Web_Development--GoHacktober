import React, { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import pr from '../assets/pr.png'
import star from '../assets/Star.png'
import issue from '../assets/issue.png'
import dev from '../assets/dev.png'
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import StatCard from "../components/StatCard";

const dataset = [
  { day: "Mon", seoul: 3 },
  { day: "Tue", seoul: 2 },
  { day: "Wed", seoul: 5 },
  { day: "Thu", seoul: 4 },
  { day: "Fri", seoul: 2 },
  { day: "Sat", seoul: 1 },
  { day: "Sun", seoul: 8 },
];

const valueFormatter = (value) => `${value} contributions`;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 15,
  borderRadius: 10,
  width: "100%",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#1717173d", 
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#171717", 
  },
}));



const chartSetting = {
  yAxis: [
    {
      label: "Contributions",
    },      
    {
      fill: 'white'
    }
  ],
  series: [
    { dataKey: "seoul", label: "Contribution Activity", valueFormatter },
  ],  

  height: 400,
  xAxis: [{ dataKey: "day", scaleType: "band", label: "Day of the Week" }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
        fill:"#ffffff"
    },   
    [`& .${axisClasses.directionX} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
      fill:"#ffffff"
    },   

    "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel":{
        fill:"white",
    },
    "& .css-1x2wln8-MuiChartsAxis-root-MuiChartsXAxis-root .MuiChartsAxis-line":{
      stroke:"white"
    },
    "& .css-1x2wln8-MuiChartsAxis-root-MuiChartsXAxis-root .MuiChartsAxis-tickContainer line":{
      stroke:"white" 
    }, 
    "& .css-175e1i1-MuiChartsAxis-root-MuiChartsYAxis-root .MuiChartsAxis-line":{
      stroke:"white"
    },   
    "& .css-175e1i1-MuiChartsAxis-root-MuiChartsYAxis-root .MuiChartsAxis-tickContainer line":{
      stroke:"white" 
    }, 
  },
};

const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  // Simulated backend JSON data

  useEffect(() => {
    document.body.style.background = "linear-gradient(to bottom, #7E22CE, #5B21B6, #312E81)";
    return () => {
      document.body.style.background = ""; 
    };
  }, []);

  const backendData = [
    {
      contributions: { issues: null, pulls: null },
      repo_name: "Hacktoberfest_2024-Android_Plant_Detection",
    },
    {
      contributions: {
        issues: [
          {
            created_at: "2023-10-21T22:46:00Z",
            html_url:
              "https://github.com/acmjec/acmjec-website-hacktoberfest2023/issues/51",
            state: "closed",
            title: "Bug : Duplication of Landing Page",
            updated_at: "2023-10-26T16:43:15Z",
          },
        ],
        pulls: null,
      },
      repo_name: "acmjec-website-hacktoberfest2023",
    },
    // Add other repositories...
  ];

  const calculateStats = (data) => {
    let pullRequests = 0;
    let issuesRaised = 0;
    let reposContributed = data.length;

    // Loop through repositories to calculate pull requests and issues
    data.forEach((repo) => {
      if (repo.contributions.issues) {
        issuesRaised += repo.contributions.issues.length;
      }
      if (repo.contributions.pulls) {
        pullRequests += repo.contributions.pulls.length;
      }
    });

    // Return calculated stats
    return {
      pullRequests,
      issuesRaised,
      reposContributed,
      starsGained: 20, // Static value for stars gained
    };
  };

  useEffect(() => {
    try {
      setData(backendData); // Simulating data fetch
      const calculatedStats = calculateStats(backendData);
      setStats(calculatedStats);
    } catch (err) {
      setError("Failed to load contributions.");
    }
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=" text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl mb-4 sm:mb-0">
            Hacktoberfest Dashboard
          </h1>
          <Avatar src="/broken-image.jpg" />
        </div>

        <div className="bg-white bg-opacity-10 shadow-md rounded-md p-4 mb-8">
          <h2 className="text-xl sm:text-2xl text-center mb-4">
            Welcome back Abiral Jain
          </h2>
          <div className="space-y-4">
            <h4 className="text-sm sm:text-base">
              Your Hacktoberfest Progress
            </h4>
            <BorderLinearProgress variant="determinate" value={90} />
            <span className="block text-right text-sm">90% completed</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {
          [
            {
              title: "Pull Requests",
              icon: pr,
              value: stats.pullRequests,
            },
            {
              title: "Issues Raised",
              icon: issue,
              value: stats.issuesRaised,
            },
            {
              title: "Stars Gained",
              icon: star,
              value: stats.starsGained,
            },
            {
              title: "Repos Contributed",
              icon: dev,
              value: stats.reposContributed,
            }
          ].map((ele, index) => (
            <StatCard key={index} title={ele.title} icon={ele.icon} value={ele.value} />
          ))
        }
      </div>


        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 bg-white bg-opacity-10  text-white  shadow-md  rounded-lg p-4">
            <BarChart
              dataset={dataset}
              xAxis={[
                {
                  scaleType: "band",
                  dataKey: "day",
                  tickPlacement: "middle",
                  tickLabelPlacement: "middle",
                  label: "Days of the Week",
                  borderRadius: '10'
                },
              ]}
              {...chartSetting}
            />
          </div>
          <div className="w-full lg:w-1/2 bg-white bg-opacity-10  shadow-md  rounded-lg p-4">
            <h2 className="text-lg mb-4">Repository Contributions</h2>
            <div className="space-y-2">
              {data.map((repo, index) => (
                <div key={index} className="flex flex-col gap-2  bg-white bg-opacity-10 p-2 rounded-lg">
                  <h3 className="text-base font-bold">{repo.repo_name}</h3>
                  <div>
                    <strong>Issues:</strong>
                    {repo.contributions.issues ? (
                      repo.contributions.issues.map((issue, i) => (
                        <div key={i}>
                          <a
                            href={issue.html_url}
                            className="text-blue-500 underline"
                          >
                            {issue.title}
                          </a>
                          <p>State: {issue.state}</p>
                          <p>
                            Created:{" "}
                            {new Date(issue.created_at).toLocaleDateString()}
                          </p>
                          <p>
                            Updated:{" "}
                            {new Date(issue.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No contributions available</p>
                    )}
                  </div>
                  <div>
                    <strong>Pulls:</strong>
                    {repo.contributions.pulls ? (
                      <p>{repo.contributions.pulls}</p>
                    ) : (
                      <p>No contributions available</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
