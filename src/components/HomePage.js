import React, { useEffect, useState } from 'react';
import api from '../Services/api';

export default function Home(){
  const [content, setContent] = useState([]);

  useEffect(() => {
    api.get('/content').then(r => setContent(r.data)).catch(err => console.error(err));
  }, []);

  const item = content[0] || {};
  return (
    <div className="page">
      <header style={{display:'flex',justifyContent:'space-between',padding:20}}>
        <div>Logo</div>
        <nav>Home &nbsp; Events &nbsp; Venues &nbsp; Organizers &nbsp; Contact</nav>
        <button>Book Now</button>
      </header>

      <section style={{padding:40, textAlign:'center', background:'#f6f6f6'}}>
        <h1>{item.title ?? 'Find and Book the Best Events & Venues Near You!'}</h1>
        <p>{item.subtitle ?? 'Popular Events'}</p>
        <div style={{maxWidth:800,margin:'20px auto'}}>
          <input placeholder="Location" style={{width:'30%',padding:10,marginRight:8}} />
          <input placeholder="Event Type" style={{width:'30%',padding:10,marginRight:8}} />
          <input placeholder="Date" style={{width:'24%',padding:10,marginRight:8}} />
          <button>Search</button>
        </div>
      </section>

      <main style={{padding:20}}>
        <h2>Popular Events</h2>
        <div dangerouslySetInnerHTML={{__html: item.body ?? '<p>Events from DB</p>'}} />
      </main>
    </div>
  );
}
