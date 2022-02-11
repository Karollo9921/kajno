# GetnowX API Practice Boilerplate

<h3>How to start</h3><br />
clone repository<br />
npm install
npm start

<h4>Install in VSC REST Client extension and test API by request.rest file</h4><br />
<br />

<h3>Tables:</h3>
<h4>users</h4>
<h4>movies</h4>
<h4>rooms</h4>
<h4>tickets</h4>
<h4>screenings</h4>
<h4>clientscards</h4>

<h2>Associations:</h2>
<h4>One to Many:</h4>
<p>SCREENING - MOVIE</p>
<p>SCREENING - ROOM</p><
<p>USER - TICKET</p>
<p>SCREENING - TICKET</p>
<br />
<h4>Many to Many:</h4>
<p>USER - SCREENING</p>
<br />
<h4>ONE to ONE:</h4><br />
<p>USER - CLIENTCARD</p><br />
<br />
<br />
<h2>Routes:</h2>
<h4>Users:</h4>
<p>POST /api/register</p>
<p>POST /api/login</p>
<p>GET /api/users</p>
<br />
<h4>Movies:</h4>
<p>POST /api/movies/create</p>
<p>GET /api/movies</p>
<p>GET /api/movies/:id</p>
<br />
<h4>Rooms:</h4>
<p>POST /api/rooms/create</p>
<p>GET /api/rooms</p>
<br />
<h4>Screenings:</h4>
<p>POST /api/screenings/create</p>
<p>GET /api/screenings</p>
<p>PATCH /api/screenings/started/:id</p>
<br />
<h4>Tickets:</h4>
<p>POST /api/tickets/create</p>
<p>PATCH /api/tickets/:id/buy</p>
<p>GET /api/tickets/:id</p>
<br />
<h4>Clientcards:</h4>
<p>POST /api/cards/create</p>
<p>GET /api/cards/:id</p>



