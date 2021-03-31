import './App.css';
import React, { useState, useEffect } from 'react';
import StarIcon from '@material-ui/icons/Star';
//import Table from './components/table';
import { MDBDataTable, MDBInput } from 'mdbreact';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import TableSearch from './components/searchTable'
function App() {
  const data = {
    columns: [
      {
        label: 'favorite',
        field: 'favorite',
        sort: 'asc',
        width: 10
      },
      {
        label: 'ifsc',
        field: 'ifsc',
        sort: 'asc',
        width: 150
      },
      {
        label: 'bank_id',
        field: 'bank_id',
        sort: 'asc',
        width: 270
      },
      {
        label: 'branch',
        field: 'branch',
        sort: 'asc',
        width: 200
      },
      {
        label: 'address',
        field: 'address',
        sort: 'asc',
        width: 100
      },
      {
        label: 'city',
        field: 'city',
        sort: 'asc',
        width: 150
      },
      {
        label: 'district',
        field: 'district',
        sort: 'asc',
        width: 100
      }
      ,
      {
        label: 'state',
        field: 'state',
        sort: 'asc',
        width: 100
      }
      ,
      {
        label: 'bank_name',
        field: 'bank_name',
        sort: 'asc',
        width: 100
      }

    ],
    rows: []
  };
  var [state, setState] = useState(data);
  var [city, setCity] = useState('MUMBAI');
  var [loading, setLoading] = useState(true);
  var [count, setCount] = useState(0);
  useEffect(() => {
    async function newData() {

      if (!localStorage.getItem('data')) {
        var data = {
          HYDERABAD: [],
          MUMBAI: [],
          GOA: [],
          BANGALORE: [],
          DELHI: [],
          CHENNAI: []
        }
        localStorage.setItem('data', JSON.stringify(data));
      }
      if (!localStorage.getItem('result')) {
        var data1 = {
          HYDERABAD: [],
          MUMBAI: [],
          GOA: [],
          BANGALORE: [],
          DELHI: [],
          CHENNAI: []
        }
        localStorage.setItem('result', JSON.stringify(data1));
      }
      var result
      if (localStorage.getItem('result')) {
        var res = JSON.parse(localStorage.getItem('result'));
        if (res[city].length > 0) {
          result = res[city]
        } else {
          var result1 = await axios(
            `http://vast-shore-74260.herokuapp.com/banks?city=${city}`,
          );
          result = result1.data
          res[city] = result
          localStorage.setItem('result', JSON.stringify(res));
        }
      }

      var data1 = JSON.parse(localStorage.getItem('data'));


      var final = data1[city]
      console.log(result);

      result.map((i, index) => {



        // if (final.includes(i.ifsc)) {
        //   console.log("inn", i.ifsc);

        //   i.favorite = <MDBInput type="checkbox" value={i.ifsc} onChange={favchange} id={index.toString()} checked />
        // } else {
        //   i.favorite = <MDBInput type="checkbox" value={i.ifsc} onChange={favchange} id={index.toString()} />
        // }
        if (final.includes(i.ifsc)) {
          console.log("inn", i.ifsc);

          i.favorite = <div id={i.ifsc} onClick={favchange}><StarIcon /></div>
        } else {


          i.favorite = <div id={i.ifsc} onClick={favchange}>Add to favorite</div>
        }
      })



      setState({ ...state, rows: result });
      setLoading(false)
    }
    newData()
  }, [city, count]);
  const favchange = (event) => {
    // console.log(event);
    var data = JSON.parse(localStorage.getItem('data'));


    data[city].push(event.target.id);
    //console.log(data);
    //document.getElementById(event.target.id).innerHTML = ReactDOMServer.renderToString(<StarIcon />);

    localStorage.setItem('data', JSON.stringify(data));
    setCount(count + 1)

  }
  const handleChange = (event) => {
    setCity(event)

  };
  return (
    <div className="App">

      {loading ? <div style={{ fontSize: '50px', position: 'fixed', top: '50%', left: '50%' }}>loading data please wait....</div> : <TableSearch city={city} state={state} setcity={handleChange} />}
    </div>
  );
}

export default App;
