import React, { useState, useEffect, useMemo } from 'react'

function PoliticianCard ({ name, image, position, biography }) {
console.log("Card")//stampato 50 vaolte, operche sto creando 50 cards, ma se cerco lettere A
//mi stampa di nuovo 50 cards, perche ogni volta che cambio una lettera mi vengono renderizzate di nuovo le cards,
//perche filteredpolitician cambia(perche sto cambiando search) e quindi ogni card viene ricreata da 0
//io non voglio cambiare le card ogni volta 

  //senza memo tutte le card vengono rirenderizzate anche quelle che non sono cambiate
  return (
    <>
      <div className='card'>
        {image &&
          <figure>
            <img src={image} alt="" />
          </figure>}
        <div>
          <h3>{name}</h3>
          <h4>{position}</h4>
          <p>{biography}</p>
        </div>
      </div>
    </>
  )
}

const MemoPoliticianCard = React.memo(PoliticianCard)

function App() {

  const [politicians, setPoliticians] = useState([])
  const [value, setValue] = useState("")

  const getData = async () => {
    const response = await fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
    console.log(response)
    const data = await response.json()
    console.log(data)
    setPoliticians(data)
  }

  // const filteredPoliticians =  politicians.filter((p, i) => {//politico true rimane in array
  //     const isInName =  p.name.toLowerCase().includes(value.toLowerCase())
  //     const isInBio=  p.biography.toLowerCase().includes(value.toLowerCase())
  //     return isInName || isInBio
  // })

  //sto ricreando questo array filtrato ad ogni rendering del mio componente

  const filteredPoliticians = useMemo(() => {
     return  politicians.filter((p, i) => {//politico true rimane in array
      const isInName =  p.name.toLowerCase().includes(value.toLowerCase())
      const isInBio=  p.biography.toLowerCase().includes(value.toLowerCase())
      return isInName || isInBio
  })
  }, [politicians, value])

  // const filteredPoliticians = useMemo(() => {
  //   return politicians.filter((p) =>
  //     p.name.toLowerCase().includes(value.toLowerCase()) ||
  //     p.biography.toLowerCase().includes(value.toLowerCase())
  //   )
  // }, [politicians, value])

  useEffect(() => {
    getData()
    ///////se uso then////
    // fetch()
    // .then(resp => resp.json)
    // .then(data => setPolitticians(data))
    // .catch(error => console.error(error))
  }, [])//vuoto> solo all avvio del componente

  return (
    <>
      
      <h1>Politicians List</h1>
      <input
        type="text"
        placeholder='search byh name or biography'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='politicians-list'>
        {
          filteredPoliticians.map((p, i) => (
            <div key={i}>
              <MemoPoliticianCard 
                {...p} />
            </div>
          ))
        }
      </div>


    </>
  )
}

export default App
