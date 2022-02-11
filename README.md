# GetnowX API Practice Boilerplate

<h3>How to start</h3><br />
clone repository<br />
npm install<br />
npm start<br />
<br />
<br />
<h4>Install in VSC REST Client extension and test API by request.rest file</h4><br />
<br />

<h3>Tables:</h3><br />
<h4>users</h4><br />
<h4>movies</h4><br />
<h4>rooms</h4><br />
<h4>tickets</h4><br />
<h4>screenings</h4><br />
<h4>clientscards</h4><br />

<h2>Associations:</h2><br />
<br />
<h4>One to Many:</h4><br />
<p>SCREENING - MOVIE</p><br />
<p>SCREENING - ROOM</p><br />
<p>USER - TICKET</p><br />
<p>SCREENING - TICKET</p><br />
<br />
<h4>Many to Many:</h4><br />
<p>USER - SCREENING</p><br />
<br />
<h4>ONE to ONE:</h4><br />
<p>USER - CLIENTCARD</p><br />
<br />
<br />
<h2>Routes:</h2><br />
<h4>Users:</h4><br />
<p>POST /api/register</p><br />
<p>POST /api/login</p><br />
<p>GET /api/users</p><br />
<br />
<h4>Movies:</h4><br />
<p>POST /api/movies/create</p><br />
<p>GET /api/movies</p><br />
<p>GET /api/movies/:id</p><br />
<br />
<h4>Rooms:</h4><br />
<p>POST /api/rooms/create</p><br />
<p>GET /api/rooms</p><br />
<br />
<h4>Screenings:</h4><br />
<p>POST /api/screenings/create</p><br />
<p>GET /api/screenings</p><br />
<p>PATCH /api/screenings/started/:id</p><br />
<br />
<h4>Tickets:</h4><br />
<p>POST /api/tickets/create</p><br />
<p>PATCH /api/tickets/:id/buy</p><br />
<p>GET /api/tickets/:id</p><br />
<br />
<h4>Clientcards:</h4><br />
<p>POST /api/cards/create</p><br />
<p>GET /api/cards/:id</p><br />
<br />


