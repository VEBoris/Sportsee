import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
// import get from '../service/Api'
import get from '../service/Mocked'

/** 
 * @function RadarStats React component for user performance
 * @param {string} props User Id
 * @returns {JSX} informations for radar chart
 */

function RadarStats(props){
  const id = props.id
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const call = new get()
    call.get(id, 'performance')
    .then(function (res){
      setData(res)
      setIsLoading(false)
    })
    .catch(function(err){
      return console.log('An error accours',err)
    })
  })
  if(!isLoading){
    const kind = Object.values(data.kind) 
    data.data.forEach((item, id) => item.kind = kind[id])
  }
  return (
    <>{!isLoading && (
      <div className='radarchart'>
      <ResponsiveContainer width="100%" aspect={1}>
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data.data}>
          <PolarGrid />
          <PolarAngleAxis style={{fontSize: '11px'}} dataKey='kind'/>
          <Radar dataKey='value' stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
    )}</>
  );
}

RadarStats.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RadarStats