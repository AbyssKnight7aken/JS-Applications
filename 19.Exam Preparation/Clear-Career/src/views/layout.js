import { html } from '../../node_modules/lit-html/lit-html.js';


//TODO Replace with actual layout
//layout shows content and shows if user is logged 
export const layoutTemplate = (userData, content) => html`
<header>
        <a id="logo" href="/"
          ><img id="logo-img" src="/images/logo.jpg" alt=""
        /></a>

        <nav>
          <div>
            <a href="/dashboard">Dashboard</a>
          </div>

          ${userData
        ? html`<div class="user">
            <a href="/create">Create Offer</a>
            <a href="/logout">Logout</a>
          </div>`
        : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>`}
          
        </nav>
      </header>

    <main id="site-content">${content}</main>

    <footer>
      <p>@ClearCareer</p>
    </footer>
`;