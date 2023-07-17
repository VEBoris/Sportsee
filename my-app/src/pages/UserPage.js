import './Page.css';
import RadarStats from '../components/radarChart';
import BarStats from '../components/barChart';
import LineStats from '../components/lineChart';
import { useEffect, useState, } from "react";
import { useParams, useNavigate, } from 'react-router-dom';
import PieStats from '../components/pieChart';
import kcal from '../assets/kcal.png';
import lipides from '../assets/lipides.png';
import proteines from '../assets/proteines.png';
import glucides from '../assets/glucides.png';
// import get from '../service/Api'
import get from '../service/Mocked'

/** 
 * React component for User Page 
 * @function UserPage 
 * @returns {JSX} Main informations about user
 */

function UserPage() {
  const {id} = useParams()
  const navigate = useNavigate()
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
    console.log(data===undefined)
    if (data === undefined) {
      navigate ('/Error')
    }
  return (
    <>{!isLoading && (
      <div className='main'>
        <div className="dashboard">
          <div className='user-name'>
            <h1>Bonjour <span className="first-name">{data.userInfos.firstName}</span></h1>
            <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
          </div>
          <main>
          <section className="score">
            <BarStats id={id}/>
            <article className='stats'>
              <LineStats id={id}/>
              <RadarStats id={id}/>
              <PieStats id={id}/>
            </article>
          </section>
            <section className='nutriscore'>
              <article className='nutri'>
                <img src={kcal} alt='calories'/>
                <p>{data.keyData.calorieCount + "kcal"}<br/><span>Calories</span></p>
              </article>
              <article className='nutri'>
                <img src={proteines} alt='proteines'/>
                <p>{data.keyData.proteinCount + "mg"}<br/><span>Proteines</span></p>
              </article>
              <article className='nutri'>
                <img src={glucides} alt='glucides'/>
                <p>{data.keyData.carbohydrateCount + "mg"}<br/><span>Glucides</span></p>
              </article>
              <article className='nutri'>
                <img src={lipides} alt='lipides'/>
                <p>{data.keyData.lipidCount + "mg"}<br/><span>Lipides</span></p>
              </article>
            </section>
        </main>
        </div>
      </div>
    )}</>
  );
}

export default UserPage;