import PropTypes from "prop-types"
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
// import get from '../service/Api'
import get from '../service/Mocked'

/** 
 * @function PieStats React component for user today score
 * @param {string} props User Id
 * @returns {JSX} informations for pie chart   
 */

const COLORS = ["#E60000", "#FFFFFF"]

function PieStats(props) {
  const id = props.id
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const call = new get()
    call.get(id, '')
    .then(function (res){
      setData(res)
      setIsLoading(false)
    })
    .catch(function(err){
      return console.log('An error accours',err)
    })
  })
  let score = [
    { name: "start", value: Number(data.todayScore)},
    { name: "range", value: 1 }
  ];
  return (
    <>{!isLoading && (
      <div className='piechart'>
      <p>Score</p>
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart width={800} height={400}>
          <Pie
            data={score}
            cx={140}
            cy={90}
            cornerRadius={50}
            innerRadius={80}
            outerRadius={90}
            startAngle={180}
            endAngle={-360}
            paddingAngle={4}
            dataKey="value"
          >
            {score.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label value={score[0].value * 100 + '%  de votre objectif'} position="center" width={50}/>
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
    )}</>
  );
}

export default PieStats

PieStats.propTypes = {
  id: PropTypes.string.isRequired
}