import { useEffect, useState } from 'react'
import apiRequest from './lib/apiRequest'

function App() {

  const texts = [
    "Marie vaatas aknast välja, kus tuul keerutas kollaseid lehti. Sügisõhtud olid alati toonud talle rahu, kuid täna tundis ta hoopis kurbust. Ta meenutas oma venda Marki, kes oli juba aastaid elanud välismaal. Lapsepõlves mängisid nad selle sama akna all, kujutades ette, et maailm oli täis seiklusi. Korraga kostis uksele koputus. Marie läks avama ja seisis silmitsi mehega, kelle nägu tundus tuttav, kuid ta ei suutnud teda kohe ära tunda. 'Marie,' ütles mees vaikselt. Marie süda jättis hetkeks löögi vahele. 'Mark?' küsis ta ettevaatlikult.",
    "Anna seisis mere ääres, päike vajus silmapiiri taha. Õhk oli jahe ja kergelt soolane. Anna meenutas lapsepõlve, kui mängis just siin rannal, unistused tulevikust peas keerlemas. Nüüd, pärast aastaid linnamelus, tundus siin kõik lihtne ja rahulik. Lained sahisesid, taevas värvus oranžiks, justkui aeg oleks peatunud. Helsingi kutsus teda tagasi, täis võimalusi ja väljakutseid, kuid ka lõputut rahutust. Anna teadis, et seal ootavad teda kohustused ja kiire elutempo. Kas ta peaks sinna minema? Siin oli kõik rahulik, muretu. Võib-olla oli just see koht, kus ta saaks leida tõelise tasakaalu. Kuid kas rahu ja vaikus olid piisavad, et teda linnast eemal hoida?",
    "Marek istus pargis vanal puupingil, vaadates üle tiigi lainetavat vett. Sügis oli hiljuti alanud, puud olid kaotamas oma rohelust ja muutumas oranžiks. Lehed tantsisid aeglaselt maapinnale, kui vaikus täitis õhku. Sügis oli alati olnud Mareki lemmik aastaaeg. See sümboliseeris midagi uut, isegi kui maailm paistis sel ajal vaiksem ja nukram. Mareki peas oli palju mõtteid, kuid sügisene rahu aitas neil settida. Marek mõtles viimastele kuudele, täis kiirustamist ja segadust, ning tundis, et nüüd oli aeg peatuda. Ta hingas sügavalt sisse ja sulges silmad, kuulates tuule õrna vilinat ja kaldale uhtuvaid laineid. Midagi selles hetkes tundus nii õige, nagu oleks aeg korraks seisma jäänud, lubades tal iseendaga rahus olla.",
    "Tekst 4",
  ]

  const styles = [
    "state1",
    "state2",
    "state3",
    "state4",
  ]
    

  const [isShowing, setIsShowing] = useState(false)
  const [index, setIndex] = useState(null)
  const [startIndex, setStartIndex] = useState(null)
  const [factors, setFactors] = useState(null);

  const getStarterId = async () => {
    try {
      const response = await apiRequest.get("/")
      console.log("response", response)
      const data = await response.data;
      console.log("data", data)
      setStartIndex(data.content)
    }
    catch(e){
      console.error(e.message)
    }
  }


  useEffect(() => {
    getStarterId()
    console.log("start idx",startIndex)
    //apiRequest.put("/6716048e045cc17a26641c41", startIndex)
    // const id = apiRequest.get("/")
    // console.log( "Start idx:" , id)
    // setStartIndex(id)
  },[])
  // useEffect(() => {
  //   // Fetch the factors from the backend when the component mounts
  //   fetch('/start-test')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log("Data.content", data.content)
  //       setStartIndex(data.content);
  //     })
  //     .catch(err => console.error('Error fetching factors:', err));
  // }, []);

  // if (!factors) {
  //   return <div>Loading...</div>;
  // }

  const handleBtnClick = async () => {
    console.log("strtIdx", startIndex)
    if(index === texts.length - 1) {
      await setIsShowing(true)
      const text = document.querySelector('#text');
      console.log(text)
      text.innerHTML = 'Katse lõppenud';
      console.log("Katse lõppenud")
      return
    }
    if(index === null) {
      setIndex(0)
      await setIsShowing(true)
    }
    else {
      setIndex(index + 1)
      await setIsShowing(true)
    }
    setTimeout(async () => {
       await setIsShowing(false)
    }, 3000)
    if (startIndex == 3) {
      setStartIndex(0)
    } else {
      setStartIndex(startIndex+1)
    }
  }

  return (
      <div className='app'>
        {isShowing && (
          <div 
            id="textContainer"
            className={startIndex == 0 ? "state1" 
            : startIndex == 1 ? "state2" 
            : startIndex == 2 ? "state3"
            : "state4"}
          >
            <p id="text">{texts[index]}</p>
          </div>
        )}
        <button onClick={handleBtnClick} className={!isShowing ? "btn active" : "btn"}>
          Näita Teksti
        </button>
      </div>
  )
}

export default App
