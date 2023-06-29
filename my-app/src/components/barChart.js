import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';
import DataApi from '../service/Api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/** 
 * @function BarStats React component for user activity
 * @param {string} props User Id
 * @returns {JSX} informations about calories and weight for bar chart 
 */

function BarStats(props){
  const id = props.id
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const call = new DataApi()
    call.get(id, 'activity')
    .then(function (res){
      setData(res)
      setIsLoading(false)
    })
    .catch(function(err){
      return console.log('An error accours',err)
    })
  },)
  const currentDay = (date) => {
    return date.split('-')[2]
  }
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
          <div className="bar-label">
            <p>{`${payload[0].value} kg`}</p>
            <p>{`${payload[1].value} kcal`}</p>
          </div>
      )
    }
  }
  return(
    <>{!isLoading && (
      <div className='barchart'>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            width={500}
            height={300}
            data={data.sessions}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid horizontal="true" vertical="" strokeDasharray="3" />
            <XAxis axisLine={false} tickLine={false} dataKey="day" tickFormatter={currentDay} />
            <YAxis axisLine={false} tickLine={false} orientation="right" />
            <Tooltip content={CustomTooltip}/>
            <Legend verticalAlign='top' align='right' height={70} iconType='circle'/>
            <Bar barSize={7} radius={[10, 10, 0, 0]} dataKey="kilogram" fill="#282D30" />
            <Bar barSize={7} radius={[10, 10, 0, 0]} dataKey="calories" fill="#E60000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}</>
  )
}

BarStats.propTypes = {
  id: PropTypes.string.isRequired
}
export default BarStats