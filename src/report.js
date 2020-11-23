import React, { useState, useEffect } from "react";

import HeatMap from './components/HeatMap';

const Report = () => {
  const [data, setData] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const queryReport = () => {//(1)
      window.gapi.client
        .request({
          path: '/v4/reports:batchGet',
           root: 'https://analyticsreporting.googleapis.com/',
           method: 'POST',
           body: {
             reportRequests: [
               {
                 viewId: '183936387',
                 "includeEmptyRows": false,
                 "dateRanges": [
                   {
                     "startDate": "30daysAgo",
                     "endDate": "yesterday"
                   }
                ],
                "metrics": [
                  {
                    "expression": "ga:users"
                  }
                ],
                "dimensions": [
                  {
                    "name": "ga:latitude"
                  },
                  {
                    "name": "ga:longitude"
                  }
                ],
                "pivots": [
                  {
                    "dimensions": [
                      {
                        "name": "ga:userType"
                      }
                    ],
                    "metrics": [
                      {
                        "expression": "ga:users"
                      }
                    ]
                  }
                ]
              }
            ]
            }
        })
        .then(displayResults, console.error.bind(console));
    };

    const displayResults = (response) => {//(2)
      const queryResult = response.result.reports[0].data.rows;
      // const formattedJSON = JSON.stringify(queryResult)
      // console.log("RESULTS => " + formattedJSON)
      // console.log(queryResult)

      let dataIn = queryResult 
      let dataArr = []
        for (let i = 0; i < dataIn.length; i++) {
          // console.log("DATA => " + data[i].dimensions)
          // let dataFormat = data[i].dimensions 
          let dataJson = {lat: dataIn[i].dimensions[0], lng: dataIn[i].dimensions[1] }
          // console.log(dataJson)
          // console.log(data[i].dimensions[0])
          
          dataArr.push(dataJson)
          //console.log(dataArr)
          
          
          // console.log("ARRAY => " + dataArr)
        };
        //console.log(dataArr)
        setData(dataArr);
        setReady(true)
        // console.log(setData)
        
      };

    queryReport();
  }, []);
  if(ready == true ) {
  return (
    <HeatMap data={data}/>
  )
  } else return(<div>Loading...</div>)
};


export default Report;