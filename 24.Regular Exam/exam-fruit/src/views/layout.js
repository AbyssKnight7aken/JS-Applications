import { html } from '../../node_modules/lit-html/lit-html.js';


//TODO Replace with actual layout
//layout shows content and shows if user is logged 
export const layoutTemplate = (userData, content) => html`
<header>
<!-- Navigation -->
<a id="logo" href="/"
    ><img id="logo-img" src="/images/logo.png" alt=""
/></a>

<nav>
    <div>
    <a href="/dashboard">Fruits</a>
    <a href="/search">Search</a>
    </div>

    <!-- Logged-in users -->
    ${userData
        ? html`<div class="user">
                    <a href="/create">Add Fruit</a>
                    <a href="/logout">Logout</a>
                </div>`
        : html`<div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
    </div>`}
    

    <!-- Guest users -->
    
    
    </div>
</nav>
</header>

<main id="main-content">${content}</main>


<footer>
<p>@Fruitipedia</p>
</footer>
    `;