import './Page.css';
import BarStats from '../components/barChart';
import { useEffect, useState, } from "react";
import { useParams } from 'react-router-dom'
import kcal from '../assets/kcal.png'
import lipides from '../assets/lipides.png'
import proteines from '../assets/proteines.png'
import glucides from '../assets/glucides.png'
// import get from '../service/Api'
import get from '../service/Mocked'

/** 
 * React component for User Page 
 * @function UserPage 
 * @returns {JSX} Main informations about user
 */

function UserPage() {
  const {id} = useParams()
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const call = new get (id)
    call.get(id, '')
    .then(function (res){
      setData(res)
      setIsLoading(false)
    })
    .catch(function(err){
      return console.log('An error accours',err)
    })
  },[id, isLoading])
  return (
    <>{!isLoading && (
      <div className='main'>
        <div className="dashboard">
          <div className='user-name'>
            <h1>Bonjour <span className="first-name">{data.userInfos.firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          </div>
          <div className="score">
            <BarStats id={id}/>
            <div className='nutriscore'>
              <div>
                <img src={kcal} alt='calories'/>
                <p>{data.keyData.calorieCount + "kcal"}<br/><span>Calories</span></p>
              </div>
              <div>
                <img src={proteines} alt='proteines'/>
                <p>{data.keyData.proteinCount + "mg"}<br/><span>Proteines</span></p>
              </div>
              <div>
                <img src={glucides} alt='glucides'/>
                <p>{data.keyData.carbohydrateCount + "mg"}<br/><span>Glucides</span></p>
              </div>
              <div>
                <img src={lipides} alt='lipides'/>
                <p>{data.keyData.lipidCount + "mg"}<br/><span>Lipides</span></p>
              </div>
            </div>
          </div>
          <div className='stats'>
          </div>
        </div>
      </div>
    )}</>
  );
}

export default UserPage;