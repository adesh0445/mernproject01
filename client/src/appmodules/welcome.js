import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'react-icons/fa';
import axios from 'axios';

export function Welcome() {
  const [appmenu, setappmenu] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9800/applist')
      .then((d) => setappmenu(d.data.applist));
  }, []);

  return (
    <Fragment>
      <div className='container myapp mt-3'>
        <div className='row text-center'>
          <div className='col-12'>
            <h3 className='text-primary welcome'></h3>
            <p className='text-secondary'>You Can Explore My Application Using Below Menu</p>
            <hr />
          </div>
          {appmenu.map((m, index) => {
            const IconComponent = Icons[m.appicon] || Icons.FaUserAlt;
            return (
              <div key={index} className='col-sm-6 col-md-3'>
                <Link to={m.applink} className='card p-3 text-decoration-none'>
                  <h1><IconComponent /></h1>
                  <h5 className='text-dark'>{m.appname}</h5>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}
