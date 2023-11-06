import { html } from '../../node_modules/lit-html/lit-html.js';


//TODO Replace with actual layout
//layout shows content and shows if user is logged 
export const layoutTemplate = (userData, content) => html`
<div id="wrapper">
    <header>
        <!-- Navigation -->
        <a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
        <nav>
            <div>
                <a href="/dashboard">Dashboard</a>
                <a href="/search">Search</a>
            </div>
            ${userData
        ? html`
            <div class="user">
                <a href="/create">Add Pair</a>
                <a href="/logout">Logout</a>
            </div>`
          : html`
            <div class="guest">
                <a href="login">Login</a>
                <a href="register">Register</a>`}
            </div>
        </nav>
    </header>
    <!-- VIEW -->
    <main id="site-content">${content}</main>
    <footer>
        <p>@SoleMates</p>
    </footer>
    `;





//       <nav>
//     <a href="/">Home</a>
//     ${userData ? html`
//     <a href="/logout">Logout</a>` : html`
//     <a href="/login">Login</a>
//     <a href="/register">Register</a>`}
// </nav>
// <main>
//     ${content}
// </main>